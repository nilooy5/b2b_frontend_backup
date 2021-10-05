import { Injectable } from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {ShebaHttpService} from '../../../modules/sheba-http/sheba-http.service';
import {catchError, map} from 'rxjs/operators';
import {StorageService} from '../../../services/storage.service';
import {PopAlertService} from '../../../modules/pop-alert/pop-alert.service';

@Injectable({
    providedIn: 'root'
})
export class SubscriptionOrderDetailsService implements Resolve<Observable<any>> {

    orderId: any;
    businessId: any;
    constructor(
        private http: ShebaHttpService,
        private router: Router,
        private storage: StorageService,
        private pop: PopAlertService
    ) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
        this.orderId = route.paramMap.get('subscription_order_id');
        return this.getSubscriptionOrderDetails();
    }

    getSubscriptionOrderDetails(id?) {
        return this.http.get('v2/businesses/' + this.storage.user.business_id + '/subscription-orders/' + (id || this.orderId)).pipe(catchError(err => {
            return of([]);
        })).pipe(map(res => {
            if (res.code === 200) {
                return res.subscription_order_details;
            } else {
                return [];
                // this.router.navigate(['/', 'dashboard', 'subscriptions']).catch(err => {});
                this.pop.open(res.message);
            }
        }));
    }


        // return of([
        //     {
        //         serviceName: 'AC Installation',
        //         OrderID: '#ID-135896',
        //         Date : '16/08/19',
        //         Time: '10am - 05pm'
        //     },
        //     {
        //         serviceName: 'AC Installation',
        //         orderID: '#ID-132196',
        //         date : '16/08/19',
        //         time: '12am - 04pm'
        //     }
        //     ,
        //     {
        //         serviceName: 'AC Installation',
        //         OrderID: '#ID-14296',
        //         Date : '16/08/19',
        //         Time: '08am - 02pm'
        //     }
        // ]);
    // }
}



