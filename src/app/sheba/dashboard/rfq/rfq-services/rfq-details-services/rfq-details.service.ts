import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {ShebaHttpService} from '../../../../../modules/sheba-http/sheba-http.service';
import {PopAlertService} from '../../../../../modules/pop-alert/pop-alert.service';
import {catchError, map} from 'rxjs/operators';
import {StorageService} from '../../../../../services/storage.service';

@Injectable({
    providedIn: 'root'
})

export class RfqDetailsService {


    constructor(private http: ShebaHttpService,
                private router: Router,
                private storage: StorageService,
                private pop: PopAlertService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        return this.getRfqDetails(route.parent.params.id);
    }
    getRfqDetails(rfqId: number) {
        const url = `v2/businesses/${this.storage.user.business_id}/procurements/${rfqId}`;

        return this.http.get(url).pipe(catchError(err => {
            this.redirectToRfqList(err.message);
            return of([]);
        })).pipe(map((response) => {
            return response.code === 200 ? response : this.redirectToRfqList('No Tender Found');
            // return response;
        }));

    }

    redirectToRfqList(message: string) {
        this.router.navigate(['/', 'dashboard', 'rfq', 'list']).then(() =>
            this.pop.open(message)
        );
    }
}
