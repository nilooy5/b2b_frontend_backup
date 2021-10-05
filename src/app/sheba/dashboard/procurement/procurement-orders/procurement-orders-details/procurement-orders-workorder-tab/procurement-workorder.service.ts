/* tslint:disable:no-trailing-whitespace */
import {Injectable} from '@angular/core';
import {ShebaHttpService} from '../../../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../../../services/storage.service';
import {PopAlertService} from '../../../../../../modules/pop-alert/pop-alert.service';
import {catchError} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class ProcurementWorkorderService {

    procurementId: any;

    constructor(
        private http: ShebaHttpService,
        private storage: StorageService,
        private pop: PopAlertService
    ) {  }

    getWorkorderDetails(order_id, bid_id) {
        const url = '/v2/businesses/' + this.storage.user.business_id +  '/procurements/' + order_id + '/bids/' + bid_id + '/work-order';
        return this.http.get(url).pipe(catchError(err => {
            this.pop.open(err.message);
            return of ([]);
        }));
    }
}
