import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OemStackedBarChartComponent } from './oem-stacked-bar-chart/oem-stacked-bar-chart.component';
import { OemPieChartComponent } from './oem-pie-chart/oem-pie-chart.component';
import { OemMatTableComponent } from './oem-mat-table/oem-mat-table.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialModule} from '../shared/material.module'
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { OEMHttpService } from '../services/oem-http.service';

export const dashboardRoute: Routes = [
  {
      path: '',
      component: DashboardComponent,
      resolve:
      {
        inputdata:OEMHttpService
      }
  }
];
@NgModule({
  declarations: [OemStackedBarChartComponent,
    OemPieChartComponent,
    OemMatTableComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(dashboardRoute)
  ]
})
export class DashboardModule { }
