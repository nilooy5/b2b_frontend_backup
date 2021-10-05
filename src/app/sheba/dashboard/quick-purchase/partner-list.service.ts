import {Injectable} from '@angular/core';
import {ShebaHttpService} from '../../../modules/sheba-http/sheba-http.service';
import {OrderService} from '../../../services/order-service/order.service';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {StorageService} from '../../../services/storage.service';

@Injectable({
    providedIn: 'root'
})
export class PartnerListService implements Resolve<Observable<any>> {

    constructor(
        private http: ShebaHttpService,
        public orderService: OrderService,
        private storage: StorageService,
        private router: Router
    ) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
        return this.getPartners();
    }

    getPartners() {
        let services = [];
        if (!this.orderService.Services.length) {
            this.router.navigate(['/', 'dashboard', 'quick-purchase']);
        }
        this.orderService.Services.forEach(service => {
            services.push({
                id: service.id,
                option: service.options || [],
                quantity: service.quantity
            });
        });
        const businessInfo = this.storage.getData('business_info');
        const geo = businessInfo ? businessInfo.geo_informations : null;
        if (geo) {
            return this.http.get('v2/partners?services=' + JSON.stringify(services) + '&lat=' + geo.lat + '&lng=' + geo.lng + '&skip_availability=1&filter=sheba&screen=partner_list').pipe(catchError(err => {
                return of([]);
            })).pipe(map(res => {
                return res.partners;
            }));
        } else {
            return of([]);
        }


    }
}
