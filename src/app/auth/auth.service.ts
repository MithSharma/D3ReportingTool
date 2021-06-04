import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { User } from "./model/user.model"
import { delay } from 'rxjs/operators';
@Injectable()
export class AuthService {
    constructor(){}
    login(email:string,password:string):Observable<User>{
        return of({id:"user-cnsjdcsdhc",email:email}).pipe(delay(2000))
    }
}

