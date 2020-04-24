import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DefaultPaginatorValues, PatientDetails } from '../../shared/models/shared.model';
import { GlobalServices } from 'src/app/shared/services/global.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quarantine-table',
  templateUrl: './quarantine-table.component.html',
  styleUrls: ['./quarantine-table.component.scss']
})
export class QuarantineTableComponent implements OnInit, OnChanges {
  @Input() tabIndex: number;
  @Input() quarantineTableDetails = {
    users: [],
    tableColumns: []
  };
  @Input() filterString: string;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  displayedColumns: string[];
  isDataAvailable: boolean = true;
  constructor(private globalService: GlobalServices, private router: Router) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();    
  }  

  ngAfterViewInit(): void {
    if (this.dataSource && this.paginator) {
      this.paginator.pageSizeOptions = DefaultPaginatorValues;
      this.paginator.pageSize = DefaultPaginatorValues[0];
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
  }

  ngOnChanges(currentChanges: SimpleChanges): void {
    if (currentChanges.filterString) {
      if (currentChanges.filterString.currentValue) {
        this.dataSource.filter = this.filterString.trim().toLowerCase();
      } else {
        this.dataSource.filter = null;
      }
      if (this.dataSource.filteredData && this.dataSource.filteredData.length === 0) {
        this.isDataAvailable = false;
      } else {
        this.isDataAvailable = true;
      }
    }
    if(currentChanges.quarantineTableDetails){
      this.drawTable();
    }    
  }

  drawTable(){
    this.displayedColumns = this.quarantineTableDetails.tableColumns;
    if (this.quarantineTableDetails.users && this.quarantineTableDetails.users.length > 0) {
      this.dataSource.data = this.quarantineTableDetails.users;
      this.isDataAvailable = true;
    } else {
      this.isDataAvailable = false;
    }
  }

  viewDetails(type:string, element: PatientDetails){
    this.globalService.QMDashboardIndex = this.tabIndex;
    if(type === 'monitor'){
      this.globalService.monitorDetail = element;      
      this.router.navigate(['/monitor-details']); 
    }else {
      this.globalService.userDetail = element;
      this.router.navigate(['/patient-details']);
    }    
  }

}
