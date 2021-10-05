import { Injectable } from '@angular/core';
import {ShebaHttpService} from '../../../../../../modules/sheba-http/sheba-http.service';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {StorageService} from '../../../../../../services/storage.service';
import {PopAlertService} from '../../../../../../modules/pop-alert/pop-alert.service';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProcurementTenderDetailFormService {

    procurementId: any;
    constructor(
        private http: ShebaHttpService,
        private router: Router,
        private storage: StorageService,
        private pop: PopAlertService
    ) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
        this.procurementId = route.parent.parent.params.procurement_id;
        return this.getProcurementTenderDetails();
    }

    getProcurementTenderDetails(id?) {
        return this.http.get('v2/businesses/' + this.storage.user.business_id + '/procurements/' + this.procurementId).pipe(catchError(err => {
            return of([]);
        })).pipe(map(res => {
            if (res.code === 200) {
                return res.procurements;
            } else {
                return [];
                // this.router.navigate(['/', 'dashboard', 'subscriptions']).catch(err => {});
                // this.pop.open(res.message);
            }
        }));
    }
}
