import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {ShebaHttpService} from '../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionServiceCategoryListService  implements Resolve<Observable<any>> {

    constructor(private http: ShebaHttpService, private storage: StorageService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
        return this.getSubscriptionCategoryList();
    }

    getSubscriptionCategoryList() {
        const businessInfo = this.storage.getData('business_info');
        const geo = businessInfo ? businessInfo.geo_informations : null;
        if (geo) {
            return this.http.get('/v2/subscriptions?for=business&key=category&lat=' + geo.lat + '&lng=' + geo.lng).pipe(catchError(err => {
                return of([]);
            })).pipe(map(res => {
                return res.subscriptions_categories;
            }));
        } else {
            return of([]);
        }
    }
}
