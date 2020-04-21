import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  currentDate = new Date();
  reportFormGroup: FormGroup;
  single: any[] = [
    {
      "name": "Germany",
      "value": 8940000
    },
    {
      "name": "USA",
      "value": 5000000
    },
    {
      "name": "France",
      "value": 7200000
    }
  ];
  multi: any[];

  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(
    private formBuilder: FormBuilder
  ) {}
  ngOnInit() {
    this.reportFormGroup = this.formBuilder.group({
      reportType: ['All', [Validators.required]],
      startDate: [{value:'', disabled:true}, [Validators.required]],
      endDate: [{value:'', disabled:true}, [Validators.required]],
    });
  }
  onSelect(event) {
    console.log(event);
  }

  downloadReport(): void {}

  reportTypeChange(event): void {
    console.log(event);
  }

  applyFilter(): void {}

  

}
