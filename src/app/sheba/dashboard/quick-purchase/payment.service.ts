import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from "rxjs";
import {ShebaHttpService} from "../../../modules/sheba-http/sheba-http.service";
import {catchError, map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PaymentService implements Resolve<Observable<any>> {

    constructor(
        private http: ShebaHttpService,
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
        return this.getPayments();
    }

    getPayments() {
        return this.http.get('v2/payments?payable_type=business').pipe(catchError(err => {
            return of([])
        })).pipe(map(res => {
            return res.payments;
        }));
    }
}
