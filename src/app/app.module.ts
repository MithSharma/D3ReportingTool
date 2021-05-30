import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { OemPieChartComponent } from './oem-pie-chart/oem-pie-chart.component';
import { OemStackedBarChartComponent } from './oem-stacked-bar-chart/oem-stacked-bar-chart.component';
import { OemMatTableComponent } from './oem-mat-table/oem-mat-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './oem-mat-table/material.module';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { DataService } from './data/data.service';

@NgModule({
  declarations: [
    AppComponent,
    OemPieChartComponent,
    OemStackedBarChartComponent,
    OemMatTableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
