import { Injectable } from '@angular/core';
import { ShebaHttpService } from '../../../../../modules/sheba-http/sheba-http.service';
import { PopAlertService } from '../../../../../modules/pop-alert/pop-alert.service';
import { StorageService } from '../../../../../services/storage.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { CoWorkerDetails } from '../../../../../types/co-workers';

@Injectable({
  providedIn: 'root'
})

export class CoWorkersDetailsService implements Resolve<CoWorkerDetails> {

    coWorkerId;

    constructor(private http: ShebaHttpService,
                private pop: PopAlertService,
                private router: Router,
                private storage: StorageService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<CoWorkerDetails> {
        this.coWorkerId = route.params.coworker_id;
        return this.getCoWorkerDetails();
    }

    getCoWorkerDetails() {
        const url = 'v2/businesses/' + this.storage.user.business_id + '/employees/' + this.coWorkerId;
        return this.http.get(url).pipe(catchError(err => {
            this.pop.open(err.message);
            return of([]);
        })).pipe(map((response) => {
            return response.code === 200 ? response.employee : this.redirectToCoWorkersList();
        }));
    }

    redirectToCoWorkersList() {
        this.router.navigate(['/', 'dashboard', 'co-workers']).then(() => this.pop.open('No Co-Worker Found'));
    }

    updateCoWorkerStatus(data: { status: string }) {
        const url = 'v2/businesses/' + this.storage.user.business_id + '/employees/' + this.coWorkerId + '/status';
        return this.http.post(url, data);
    }

}
