import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {Observable, of} from "rxjs";
import {ShebaHttpService} from "../../../modules/sheba-http/sheba-http.service";
import {catchError, map} from "rxjs/operators";
import {OrderService} from '../../../services/order-service/order.service';

@Injectable({
    providedIn: 'root'
})
export class ScheduleService implements Resolve<Observable<any>> {

    constructor(
        private http: ShebaHttpService,
        public orderService: OrderService,
        private router: Router
    ) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
        return this.getTimes();
    }

    getTimes() {
        if (this.orderService.Services.length && this.orderService.Partner) {
            let category = this.orderService.Services ? this.orderService.Services[0].category_id : null;
            let partner = this.orderService.Partner ? this.orderService.Partner.id : null;

            return this.http.get('v2/times?category=' + category + '&partner=' + partner + '&limit=14').pipe(catchError(err => {
                return of([]);
            })).pipe(map(res => {
                return res.dates;
            }));
        } else {
            this.router.navigate(['/', 'dashboard', 'quick-purchase']).catch(err => {
                console.log(err);
            })
            return of(null);
        }

    }
}
