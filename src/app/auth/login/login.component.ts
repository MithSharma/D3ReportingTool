import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { noop } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppState } from 'src/app/reducers';
import { login } from '../auth.actions';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private fb:FormBuilder,
    private router:Router,
    private authService:AuthService,
    private store:Store<AppState>) { }
  form: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['test@oemTestReports.com', [Validators.required]],
      password: ['test', [Validators.required]]
  });
  }
  login(){
      const val = this.form.value;

      this.authService.login(val.email,val.password)
      .pipe(
        tap(user=>{
          this.store.dispatch(login({user}))
          this.router.navigateByUrl("/dashboard")
        })
      )
      .subscribe(
        noop,
        (error)=> alert("login error")
      )
  }

}
