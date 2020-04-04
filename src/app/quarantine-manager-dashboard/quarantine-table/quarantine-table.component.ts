import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DefaultPaginatorValues } from '../../shared/models/shared.model';

@Component({
  selector: 'app-quarantine-table',
  templateUrl: './quarantine-table.component.html',
  styleUrls: ['./quarantine-table.component.scss']
})
export class QuarantineTableComponent implements OnInit, OnChanges {
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
  constructor() { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.displayedColumns = this.quarantineTableDetails.tableColumns;
    if (this.quarantineTableDetails.users && this.quarantineTableDetails.users.length > 0) {
      this.dataSource.data = this.quarantineTableDetails.users;
      this.isDataAvailable = true;
    } else {
      this.isDataAvailable = false;
    }
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
    if (currentChanges.filterString && currentChanges.filterString.currentValue) {
      this.dataSource.filter = this.filterString.trim().toLowerCase();
    }
  }

  viewDetails(element){

  }

}
