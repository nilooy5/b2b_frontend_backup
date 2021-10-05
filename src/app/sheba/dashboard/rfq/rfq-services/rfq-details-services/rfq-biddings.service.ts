import { Injectable } from '@angular/core';
import {ShebaHttpService} from '../../../../../modules/sheba-http/sheba-http.service';
import {ActivatedRouteSnapshot, Router} from '@angular/router';
import {StorageService} from '../../../../../services/storage.service';
import {PopAlertService} from '../../../../../modules/pop-alert/pop-alert.service';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RfqBiddingsService {

  constructor(private http: ShebaHttpService,
              private router: Router,
              private storage: StorageService,
              private pop: PopAlertService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        return this.getBiddingDetails(route.parent.parent.params.id);
    }

    getBiddingDetails(rfqId: number) {
        const url = `v2/businesses/${this.storage.user.business_id}/procurements/${rfqId}/bid-history`;
        return this.http.get(url).pipe(catchError(err => {
            this.redirectToRfqList(err.message);
            return of([]);
        })).pipe(map((response) => {
            // return response.code === 200 ? response : this.redirectToRfqList('No Tender Found');
            return response;
        }));
    }

    redirectToRfqList(message: string) {
        this.router.navigate(['/', 'dashboard', 'rfq', 'list']).then(() =>
            this.pop.open(message)
        );
    }
}
