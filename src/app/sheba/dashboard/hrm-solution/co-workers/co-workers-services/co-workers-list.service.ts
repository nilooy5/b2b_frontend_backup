import { Injectable, EventEmitter } from '@angular/core';
import { Resolve } from '@angular/router';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PopAlertService } from '../../../../../modules/pop-alert/pop-alert.service';
import { ShebaHttpService } from '../../../../../modules/sheba-http/sheba-http.service';
import { StorageService } from '../../../../../services/storage.service';

@Injectable({
    providedIn: 'root'
})

export class CoWorkersListService implements Resolve<any> {

    baseUrl: string;

    constructor(private storage: StorageService,
                private http: ShebaHttpService,
                private pop: PopAlertService) {
        this.baseUrl = `v2/businesses/${storage.user.business_id}`;
    }

    public coworkerListActiveInactiveEvent = new EventEmitter();

    resolve(): Observable<any> {
        return forkJoin([
            this.getCoWorkersList(),
            this.getDepartmentsList()
        ]).pipe(map((response) => {
            const [ { employees }, { departments } ] = response;
            return { departments, employees };
        }));
    }

    getCoWorkersList() {
        const url = 'v2/businesses/' + this.storage.user.business_id + '/employees?offset=0&limit=10';
        return this.http.get(url).pipe(catchError(err => {
            this.pop.open(err.message);
            return of([]);
        })).pipe(map((response) => {
            return response;
        }));
    }

    getDepartmentsList() {
        const url = 'v2/businesses/' + this.storage.user.business_id + '/departments';
        return this.http.get(url).pipe(catchError(err => {
            this.pop.open(err.message);
            return of([]);
        })).pipe(map((response) => {
            return response;
        }));
    }
    activeOrInactiveOrInviteRequests(data): Observable<any> {
        const url = this.baseUrl + '/employees/change-status';
        return this.http.post(url, data);
    }
    sendInvitation(data: any): Observable<any> {
        const url = this.baseUrl + '/employees/invite';
        return this.http.post(url, data);
    }

}
