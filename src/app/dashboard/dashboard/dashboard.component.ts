import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { logout } from 'src/app/auth/auth.actions';
import { AuthState } from 'src/app/auth/reducers';
import { OEMHttpService } from '../../services/oem-http.service';
import { ActivatedRoute } from '@angular/router';
import { TestData } from 'src/app/data/data-type';
import * as XLSX  from 'xlsx'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private oemHttpService :OEMHttpService,
  private store:Store<AuthState>,
  private route: ActivatedRoute) { }
  quaterArray=[];
  value:string;
  inputData:any;
  title = 'OEM Test Reporting';
  router_data:any;
  selected:string;
  isLoggedIn$:Observable<boolean>;
  ngOnInit(): void {
    this.router_data = this.route.snapshot.data.inputdata;
    this.quaterArray = Object.keys(this.router_data);
    this.selected = this.quaterArray[0];
    this.inputData = this.router_data[this.quaterArray[0]]
  }
  changeQuater(event){
    this.inputData = this.router_data[event.value];
    this.selected = event.value;
  }
  onLogout(){
      this.store.dispatch(logout())
  }
  excelToJson(reader){
    var fileData = reader.result;
    var wb = XLSX.read(fileData, {type : 'binary'});
    var data = {};
    wb.SheetNames.forEach(function(sheetName){
         var rowObj = XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);
         var rowString = JSON.stringify(rowObj);
         data[sheetName] = JSON.parse(rowString);
    });
    this.router_data = data;
    this.quaterArray = Object.keys(this.router_data);
    this.selected = this.quaterArray[0];
    let obj:any={};
   this.quaterArray.forEach(quater=>{
      obj[quater] = this.router_data[quater].map(ele=>{
        return {
          "Status":ele["Status "],
          "System_Name":ele["System Name"],
          "Test_Case_ID":ele["Test Case ID"],
          "Comments":ele["Comments"] || ""
        }
      })
    })
    this.router_data = obj
    this.inputData = this.router_data[this.quaterArray[0]];
  }
  loadFileXLSX(event){
    var input = event.target;
    var reader = new FileReader();
    reader.onload = this.excelToJson.bind(this,reader);
    reader.readAsBinaryString(input.files[0]);
}
}
