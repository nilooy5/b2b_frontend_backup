import { Injectable } from '@angular/core';
import { Resolve} from '@angular/router';
import {forkJoin, Observable, of} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { StorageService } from '../../../../services/storage.service';
import { ShebaHttpService} from '../../../../modules/sheba-http/sheba-http.service';
import { PopAlertService } from '../../../../modules/pop-alert/pop-alert.service';
import { TenderList } from '../../../../types/tender';

@Injectable({
    providedIn: 'root'
})

export class TenderListService implements Resolve<any> {

    baseUrl = 'v2/businesses/tenders';

    constructor(private storage: StorageService,
                private http: ShebaHttpService,
                private pop: PopAlertService) { }

    resolve(): Observable<any> | Promise <any> | any {
        return forkJoin([
            this.getTenderList(),
            this.getTenderFilterOptions()
        ]).pipe(map((response) => {
            return response;
        }));
    }

    private apiCall(url, param?) {
        const params = {
            ...param,
            token: ''
        };
        return this.http.get(url, { params, responseType: 'text' }).pipe(catchError(err => {
            this.pop.open(err.message);
            return of([]);
        })).pipe(map((response) => {
            return JSON.parse(response);
        }));
    }


    getTenderList() {
        return this.apiCall(this.baseUrl);
    }

    getTenderFilterOptions() {
        const url = this.baseUrl + '/filter-options';
        return this.apiCall(url);
    }

    getFilteredTenders(param) {
        const params = { ...param,  token: '' };
        return this.http.get(this.baseUrl, { params, responseType: 'text'}).pipe(catchError(err => {
            this.pop.open(err.message);
            return of([]);
        })).pipe(map((response) => {
            return JSON.parse(response);
        }));
    }

}

