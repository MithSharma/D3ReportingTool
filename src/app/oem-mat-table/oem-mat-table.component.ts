import { Component, AfterViewInit,ViewChild } from '@angular/core';
import {TestDataValue} from "../data/data";
import { TestData } from '../data/data-type'
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { DataService } from '../data/data.service';

const local_data:TestData[] = TestDataValue.System_Test_Result_Q1;

@Component({
  selector: 'app-oem-mat-table',
  templateUrl: './oem-mat-table.component.html',
  styleUrls: ['./oem-mat-table.component.scss']
})
export class OemMatTableComponent implements AfterViewInit{
  constructor(private dataService:DataService) { }
  displayedColumns: string[] = ['System_Name', 'Test_Case_ID', 'Status', 'Comments'];
  dataSource = new MatTableDataSource<TestData>(local_data);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  filter:string=""
  ngAfterViewInit() {

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
