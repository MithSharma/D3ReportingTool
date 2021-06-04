import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import * as fromAuth from './reducers';
import { MaterialModule } from '../shared/material.module'
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './auth.guard';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild([
      {
        path:'',
        component:LoginComponent
      }
    ]),
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.authReducer)
  ]
})
export class AuthModule {
  static forRoot():ModuleWithProviders<any>{
    return {
        ngModule:AuthModule,
        providers:[
          AuthService,
          AuthGuard
        ]
    }
  }
}
