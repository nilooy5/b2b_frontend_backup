import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {Observable, of} from "rxjs";
import {ShebaHttpService} from "../../../modules/sheba-http/sheba-http.service";
import {catchError, map} from "rxjs/operators";
import {OrderService} from '../../../services/order-service/order.service';
import {PopAlertService} from '../../../modules/pop-alert/pop-alert.service';

@Injectable({
    providedIn: 'root'
})
export class ServiceListService implements Resolve<Observable<any>> {

    constructor(
        private http: ShebaHttpService,
        public orderService: OrderService,
        private router: Router,
        private pop: PopAlertService
    ) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
        if (this.orderService.SubCategory) {
            return this.getServices();
        } else {
            this.router.navigate(['/', 'dashboard', 'quick-purchase']).catch(err => {
            });
            return null;
        }
    }

    getServices() {
        // ?is_business=1
        return this.http.get('v2/categories/' + this.orderService.SubCategory.id + '/services?is_b2b=1').pipe(catchError(err => {
            this.pop.open('Not Found.');
            return of([]);
        })).pipe(map(res => {
            return res.category.services;
        }));
    }
}
