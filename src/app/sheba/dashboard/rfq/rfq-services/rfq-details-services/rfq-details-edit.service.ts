import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {ShebaHttpService} from '../../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../../services/storage.service';
import {PopAlertService} from '../../../../../modules/pop-alert/pop-alert.service';

@Injectable({
    providedIn: 'root'
})

export class RfqDetailsEditService implements Resolve<any> {

    rfqId;

    constructor(private http: ShebaHttpService,
                private router: Router,
                private storage: StorageService,
                private pop: PopAlertService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        this.rfqId = route.parent.parent.params.id;
        return this.getRfqDetailsInfo();
    }

    getRfqDetailsInfo() {
        const url = `v2/businesses/${this.storage.user.business_id}/procurements/${this.rfqId}`;

        return this.http.get(url).pipe(catchError(err => {
            this.redirectToRfqDetails(err.message);
            return of([]);
        })).pipe(map((response) => {
            return response.code === 200 ? response.procurement : this.redirectToRfqDetails('Nothing Found');
        }));

    }

    redirectToRfqDetails(message: string) {
        this.router.navigate(['/', 'dashboard', 'rfq', 'list', this.rfqId, 'details']).then(() =>
            this.pop.open(message)
        );
    }

    updateAdvanceRfq(data) {
        const url = `v2/businesses/${this.storage.user.business_id}/procurements/${this.rfqId}/update-item`;
        return this.http.post(url, data);
    }
}
