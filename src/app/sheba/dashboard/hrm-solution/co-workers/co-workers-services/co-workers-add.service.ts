import {Injectable} from '@angular/core';
import {ShebaHttpService} from '../../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../../services/storage.service';
import {Observable, of} from 'rxjs';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {catchError, map} from 'rxjs/operators';
import {CoWorkerStorageService} from '../../../../../services/co-workers-storage-service/co-worker-storage.service';
import {PopAlertService} from '../../../../../modules/pop-alert/pop-alert.service';

@Injectable({
    providedIn: 'root'
})

export class CoWorkersAddService implements Resolve<any> {
    baseUrl: string;

    constructor(private http: ShebaHttpService,
                private pop: PopAlertService,
                private router: Router,
                private coWorkerStorageService: CoWorkerStorageService,
                private storage: StorageService) {
        this.baseUrl = 'v2/businesses/' + this.storage.user.business_id + '/employees';
    }

    resolve(router: ActivatedRouteSnapshot): Observable<any> {
        const coworkerIdFromStorage = this.coWorkerStorageService.CoworkerId;
        const coworkerIdFromQueryParams = router.queryParams && router.queryParams.coworkerId;

        if (coworkerIdFromStorage || coworkerIdFromQueryParams) {
            if (coworkerIdFromQueryParams) {
                this.coWorkerStorageService.CoworkerId = parseInt(coworkerIdFromQueryParams);
            }
            return this.getCoWorkerDetails(this.coWorkerStorageService.CoworkerId);
        }

        return;
    }

    getCoWorkerDetails(coworkerId: string | number) {
        const url = this.baseUrl + '/' + coworkerId;
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

    addBasicInformation(data) {
        return this.http.post(this.baseUrl, data);
    }

    updateBasicInformation(employeeId, data) {
        const url = `${this.baseUrl}/${employeeId}/basic-info`;
        return this.http.post(url, data);
    }

    updateOfficialInformation(employeeId, data) {
        const url = `${this.baseUrl}/${employeeId}/official-info`;
        return this.http.post(url, data);
    }

    updatePersonalInformation(employeeId, data) {
        const url = `${this.baseUrl}/${employeeId}/personal-info`;
        return this.http.post(url, data);
    }

    updateFinancialInformation(employeeId, data) {
        const url = `${this.baseUrl}/${employeeId}/financial-info`;
        return this.http.post(url, data);
    }

    updateEmergencyInformation(employeeId, data) {
        const url = `${this.baseUrl}/${employeeId}/emergency-info`;
        return this.http.post(url, data);
    }
}
