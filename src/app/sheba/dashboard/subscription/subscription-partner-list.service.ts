import {Injectable} from '@angular/core';
import {ShebaHttpService} from '../../../modules/sheba-http/sheba-http.service';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {StorageService} from '../../../services/storage.service';
import {SubscriptionService} from '../../../services/subscription-service/subscription.service';

@Injectable({
    providedIn: 'root'
})
export class SubscriptionPartnerListService implements Resolve<Observable<any>> {

    constructor(
        private http: ShebaHttpService,
        private subscriptionService: SubscriptionService,
        private storage: StorageService,
        private router: Router
    ) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
        return this.getPartners();
    }

    getPartners(time?) {
        let services = this.subscriptionService.Services;
        const dates = this.subscriptionService.Dates;
        const subscriptionType = 'monthly';
        const subscriptionTime = time || this.subscriptionService.Time;

        if (services && services.length) {
            services = services.map(service => {
                return {
                    id: service.id,
                    quantity : service.quantity,
                    option: Array.isArray(service.option) ? service.option : [service.option]
                };
            });
            const businessInfo = this.storage.getData('business_info');
            const geo = businessInfo ? businessInfo.geo_informations : null;
            if (geo) {
                // tslint:disable-next-line:max-line-length
                return this.http.get('v2/subscriptions/partners?services=' + JSON.stringify(services)
                    + '&lat=' + geo.lat
                    + '&lng=' + geo.lng
                    + '&date=' + JSON.stringify(dates)
                    + '&subscription_type=' + subscriptionType
                    + '&time=' + subscriptionTime).pipe(catchError(err => {
                    return of([]);
                })).pipe(map(res => {
                    return res.partners;
                }));
            } else {
                return of([]);
            }
        } else  {
            this.router.navigate(['/', 'dashboard', 'quick-purchase']);
        }
    }

}
