import {Injectable} from '@angular/core';
import {StorageService} from '../../../../../services/storage.service';
import {ShebaHttpService} from '../../../../../modules/sheba-http/sheba-http.service';
import {PopAlertService} from '../../../../../modules/pop-alert/pop-alert.service';
import {forkJoin, Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Resolve} from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class CoWorkersBasicService implements Resolve<any> {
    baseUrl: string;

    constructor(private storage: StorageService,
                private http: ShebaHttpService,
                private pop: PopAlertService) {
        this.baseUrl = `v2/businesses/${storage.user.business_id}`;
    }

    resolve(): Observable<any> {
        return forkJoin([
            this.getCoWorkersList(),
            this.getDepartmentsList()
        ]).pipe(map((response) => {
            const [{employees}, {departments}] = response;
            return {departments, employees};
        }));
    }

    getCoWorkersList() {
        const url = this.baseUrl + '/employees?offset=0&limit=250&status=active&sort_by_name=asc';
        return this.getApiCall(url);
    }

    getDepartmentsList() {
        const url = this.baseUrl + '/departments';
        return this.getApiCall(url);
    }

    private getApiCall(url) {
        return this.http.get(url).pipe(catchError(err => {
            this.pop.open(err.message);
            return of([]);
        })).pipe(map((response) => {
            return response;
        }));
    }
}
