import { Component, AfterViewInit,ViewChild, Input, SimpleChanges } from '@angular/core';
import {TestDataValue} from "../../data/data";
import { TestData } from '../../data/data-type'
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { DataService } from '../../data/data.service';
import { OnChanges } from '@angular/core';


@Component({
  selector: 'app-oem-mat-table',
  templateUrl: './oem-mat-table.component.html',
  styleUrls: ['./oem-mat-table.component.scss']
})
export class OemMatTableComponent implements AfterViewInit, OnChanges{
  constructor(private dataService:DataService) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource<TestData>(changes.inputData.currentValue)
  }
  @Input() inputData:TestData[];
  displayedColumns: string[] = ['System_Name', 'Test_Case_ID', 'Status', 'Comments'];
  dataSource:any;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  filter:string=""
  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<TestData>(this.inputData);
    this.dataService.missionAnnounced$.subscribe(data=>{
      this.dataSource.filter = data as string ;
    })
    this.dataSource.paginator = this.paginator;

    this.dataSource.filterPredicate = ((data, filter) => {
      const a = !filter.System_Name || data.System_Name === filter.System_Name;
      const b = !filter.Status || data.Status === filter.Status;
      return a && b;
    }) as (TestData, string) => boolean;
  }

}
