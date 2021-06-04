import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { tap } from "rxjs/operators";
import { AppState } from "../reducers";
import { isLoggedIn } from "./auth.selector";



@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store:Store<AppState>,private router:Router){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean>{

      return this.store.pipe(
        select(isLoggedIn),
        tap(isLoggedIn =>{
              if(!isLoggedIn){
                this.router.navigateByUrl("/")
              }
        })
      )
  }

}
