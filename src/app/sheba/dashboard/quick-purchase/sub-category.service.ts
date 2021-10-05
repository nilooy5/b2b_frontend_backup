import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {ShebaHttpService} from '../../../modules/sheba-http/sheba-http.service';
import {catchError, map} from 'rxjs/operators';
import {OrderService} from '../../../services/order-service/order.service';
import {StorageService} from '../../../services/storage.service';

@Injectable({
    providedIn: 'root'
})
export class SubCategoryService implements Resolve<Observable<any>> {

    constructor(
        private http: ShebaHttpService,
        private orderService: OrderService,
        private storage: StorageService
    ) {
        this.orderService.reset();
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
        return this.getSubCategory();
    }

    getSubCategory() {
        const businessInfo = this.storage.getData('business_info');
        const default_geo = {lat: '23.792270658704', lng: '90.40598988533'};
        const geo = businessInfo && businessInfo.geo_informations ? businessInfo.geo_informations : default_geo;
        const url = 'v1/categories?&with=children&is_b2b=1&lat=' + geo.lat + '&lng=' + geo.lng;
        return this.http.get(url).pipe(catchError(err => {
            return of([]);
        })).pipe(map(res => {
            return res.categories;
        }));
    }
}
