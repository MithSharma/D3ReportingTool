import { BrowserModule } from '@angular/platform-browser';
import {  NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { DataService } from './data/data.service';
import { OEMHttpService } from './services/oem-http.service';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { RouterModule } from '@angular/router';
import { reducers } from './reducers/index'
import { AuthGuard } from './auth/auth.guard';
import { EffectsModule } from '@ngrx/effects';
const routes = [
  {
    path:"dashboard",
    loadChildren:()=> import('./dashboard/dashboard.module').then(m=>m.DashboardModule),
    canActivate:[AuthGuard]
  },
  {
    path:'**',
    redirectTo:"/"
  }
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    AuthModule.forRoot(),
    StoreModule.forRoot(reducers, { }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    DashboardModule
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    DataService,OEMHttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
