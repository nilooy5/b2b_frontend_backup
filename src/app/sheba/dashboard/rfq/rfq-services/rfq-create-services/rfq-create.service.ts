import {Injectable} from '@angular/core';
import {catchError, map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {StorageService} from '../../../../../services/storage.service';
import {ShebaHttpService} from '../../../../../modules/sheba-http/sheba-http.service';
import {PopAlertService} from '../../../../../modules/pop-alert/pop-alert.service';

@Injectable({
    providedIn: 'root'
})

export class RfqCreateService {

    baseUrl = 'v2/businesses/' + this.storage.user.business_id + '/procurements';

    constructor(private storage: StorageService,
                private http: ShebaHttpService,
                private pop: PopAlertService) {
    }

    private apiCall(url, params?) {
        return this.http.get(url, {params, responseType: 'text'}).pipe(catchError(err => {
            this.pop.open(err.message);
            return of([]);
        })).pipe(map((response) => {
            return JSON.parse(response);
        }));
    }

    getAdditionalInformation() {
        const url = this.baseUrl + '/create';
        return this.apiCall(url);
    }

    getRfqTags(params?) {
        const url = this.baseUrl + '/tags?search=' + params;
        return this.http.get(url).pipe(catchError(err => {
            this.pop.open(err.message);
            return of([]);
        })).pipe(map((response) => {
            return response;
        }));
    }

    postRfq(data): Observable<any> {
        return this.http.post(this.baseUrl, data);
    }
}
