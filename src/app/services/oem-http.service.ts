import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { TestData } from "../data/data-type"
import { TestDataValue } from "../data/data";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";

@Injectable()
export class OEMHttpService implements Resolve<TestData[]>{
    resolve(route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot):Observable<any> {
        return this.getTestData()
    }

    getTestData():Observable<any>{
        return of(TestDataValue);
    }

}
