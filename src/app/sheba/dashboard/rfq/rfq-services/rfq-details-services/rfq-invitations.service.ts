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
export class RfqInvitationsService {

  constructor(private http: ShebaHttpService,
              private router: Router,
              private storage: StorageService,
              private pop: PopAlertService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        return this.getInvitations(route.parent.params.id);
    }

    getInvitations(rfqId: number) {
        const url = `v2/businesses/${this.storage.user.business_id}/procurements/${rfqId}/invitations`;
        return this.http.get(url).pipe(catchError(err => {
            this.redirectToRfqList(err.message);
            return of([]);
        })).pipe(map((response) => {
            return response;
        }));
    }

    redirectToRfqList(message: string) {
        this.router.navigate(['/', 'dashboard', 'rfq', 'list']).then(() =>
            this.pop.open(message)
        );
    }
}
