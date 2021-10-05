import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Service } from '../../../models/service';
import { SubscriptionService } from '../../../services/subscription-service/subscription.service';
import { catchError, map } from 'rxjs/operators';
import { ShebaHttpService } from '../../../modules/sheba-http/sheba-http.service';

@Injectable({
    providedIn: 'root'
})
export class SubscriptionDetailsService implements Resolve<Observable<any>> {

    constructor(
        private subscriptionService: SubscriptionService,
        private http: ShebaHttpService
    ) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
        return this.getService();
    }

    getService() {
        return this.http.get('v1/services/' + this.subscriptionService.Subscription.service_id)
            .pipe(catchError(err => {
                return of([]);
            })).pipe(map(res => {
                const service = res.service;
                service.category = {
                    id: service.category_id,
                    name: service.category_name,
                    parent: {
                        id: service.master_category_name,
                        name: service.master_category_name,
                    }
                };
                return new Service(service);
            }));
    }
}
