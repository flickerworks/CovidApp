import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { RestfullServices } from '../shared/services/restfull.services';
import { ReportData, MultiChart, SingleChart, MonthData } from '../shared/models/shared.model';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  monthsAll: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  currentMonth: number = (new Date()).getMonth();
  currentDate = new Date();
  months: string[] = [];
  monthData = {};
  totalCases: number = 0;
  criticalCases: number = 0;
  reportFormGroup: FormGroup;
  data: MultiChart[]= [];
  sourceData: MultiChart[]= [];
  multi: any[];
  maxStartDate;
  maxEndDate;
  view: any[] = [window.innerWidth / 1.15, 400];
  
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Dates';
  showYAxisLabel = true;
  yAxisLabel = 'Total number of cases';

  colorScheme = {
    domain: ['#3A73DB', '#FF4701', '#C7B42C', '#AAAAAA']
  };

  constructor(
    private formBuilder: FormBuilder,
    private restFulService: RestfullServices
  ) {
    this.months = this.monthsAll.slice(0, this.currentMonth + 1);
  }
  ngOnInit() {
    this.reportFormGroup = this.formBuilder.group({
      reportType: [this.months[this.currentMonth], [Validators.required]],
      startDate: [{ value: '', disabled: true }, [Validators.required]],
      endDate: [{ value: '', disabled: true }, [Validators.required]],
    });
    this.getUserData();
  }

  dateChange(type, selectedDate){
    if(type === 'start'){
      const date = new Date(selectedDate.value);
      this.maxStartDate = new Date(selectedDate.value);
      date.setDate(date.getDate()+29);
      if(date > this.currentDate){
        this.maxEndDate = this.currentDate;
      }else{
        this.maxEndDate = date;
      }
      
    }/* else {
      const date = new Date(selectedDate.value);
      date.setDate(date.getDate()-29);
      this.minStartDate = date;
      this.maxStartDate = new Date(selectedDate.value);
    } */
  }

  onSelect(event) {
    console.log(event);
    if(this.reportFormGroup.get('reportType').value === 'All'){
      this.reportFormGroup.get('reportType').setValue(event.series);
      this.reportTypeChange();
    }
    
  }

  dateDifference(endDate, startDate){
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    if(diffDays > 30){
      return false;
    }
    return true;
  }

  onResize(event) {
      this.view = [event.target.innerWidth / 1.15, 400];
  }

  onActivate(data): void {
    // console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    // console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  downloadReport(): void { }

  totalAndCriticalCases(data: MultiChart[]){
    let total = {total:0, critical:0};
    for(let i=0; i<data.length; i++){
      total.total += data[i].series[0].value;
      total.critical += data[i].series[1].value
    }
    this.totalCases = total.total;
    this.criticalCases = total.critical;
  }

  reportTypeChange(): void {
    this.data = [];
    const month = this.reportFormGroup.get('reportType').value;
    if(month !== "All"){
      this.xAxisLabel = "Dates";
      if(this.monthData[month]){
        this.data = this.singleMonth(month, this.monthData[month]);     
        this.sourceData = this.singleMonth(month, this.monthData[month]);  
        this.totalAndCriticalCases(this.data); 
      }      
    }else{
      this.xAxisLabel = "Months";
      this.data = this.allMonths();
      this.sourceData = this.allMonths();
      this.totalAndCriticalCases(this.data);
    }    
  }

  applyFilter(): void { 
    const startDate = this.reportFormGroup.get('startDate').value,
    endDate = this.reportFormGroup.get('endDate').value;

    this.data = this.sourceData.filter(ele => {
      const date = new Date(ele.name+' '+new Date().getFullYear()),
      high = date >= startDate,
      low = date <= endDate;
      return  high && low;
    })
    this.totalAndCriticalCases(this.data);
  }


  getUserData() {
    const request = {};
    this.restFulService.post(request, "REPORTGRAPHQM").subscribe(response => {
      const payload = response[0].PAYLOAD.REPORTGRAPHQM;
      if (payload && payload.RECORD) {
        if (Array.isArray(payload.RECORD)) {
          const data = payload.RECORD;
          this.filterMonthWise(data);
          // this.filterMonthWise(this.tempData());
        } else {
          const data = [payload.RECORD];
          this.filterMonthWise(data);
          // this.filterMonthWise(this.tempData());
        }
      }
    })
  }

  //to generate temp data
  tempData(){
    const data: ReportData[] = [];
    for(let i=1; i<31; i++){
      data.push({
        TOTALCRITICAL: Math.floor((Math.random() * (5 * i))),
        TOTALRECORDS: Math.floor((Math.random() * (8 * i))),
        REPORTDATE: "2020-04-"+i
      })
    }
    return data;
  }


  singleMonth(month, data: MonthData[]): MultiChart[] {
    const chartData: MultiChart[] = [];
    data.forEach((ele, i) => {
      chartData.push({
        name: ele.date.toString()+" "+month,
        series: [
          { name: 'Total Cases', value: ele.total },
          { name: 'Critical Cases', value: ele.critical }
        ]
      })
    })
    // console.log(chartData);
    return chartData;
  }

  allMonths(): MultiChart[] {
    const chartData: MultiChart[] = [];
    this.months.forEach(month => {
      let monthData;
      if(this.monthData[month]){
        monthData = this.getTotal(this.monthData[month]);
      }      
      const obj = {
        name: month,
        series: [
          { name: 'Total Cases', value:  (monthData) ? monthData.total : 0},
          { name: 'Critical Cases', value: (monthData) ? monthData.critical : 0 }
        ]
      }
      chartData.push(obj);
    })
    return chartData;
  }

  getTotal(data: MonthData[]): MonthData{
    const total: MonthData = data.reduce((a, b) => {
      return {
        date:'',
        total: a.total + b.total,
        critical: a.critical + b.critical
      }
    })
    return total;
  }

  

  filterMonthWise(records: ReportData[]) {
    records.forEach(ele => {
      const dateStr = ele.REPORTDATE,
        dateStrToArr = dateStr.split("-"),
        date = Number(dateStrToArr[2]),
        month = this.monthsAll[Number(dateStrToArr[1]) - 1],
        year = Number(dateStrToArr[0]);
      if (!this.monthData[month]) {
        this.monthData[month] = [];
      }
      this.monthData[month].push({
        date: date,
        total: ele.TOTALRECORDS,
        critical: ele.TOTALCRITICAL
      })
      this.reportTypeChange();
    })
    // console.log(this.monthData)
  }
}
