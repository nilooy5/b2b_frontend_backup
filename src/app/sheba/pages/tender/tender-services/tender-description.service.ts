import {Injectable} from '@angular/core';
import {StorageService} from '../../../../services/storage.service';
import {ShebaHttpService} from '../../../../modules/sheba-http/sheba-http.service';
import {PopAlertService} from '../../../../modules/pop-alert/pop-alert.service';
import {catchError, map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class TenderDescriptionService {

    baseURL = 'v2/businesses/tenders';

    constructor(private storage: StorageService,
                private http: ShebaHttpService,
                private pop: PopAlertService) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise <any> | any {
        const descriptionId = route.params.id;
        return this.getTenderDescription(descriptionId).pipe(map((result) => {
            return result;
        }));
    }

    private apiCall(url) {
        const params = { token: '' };
        return this.http.get(url, { params, responseType: 'text'}).pipe(catchError(err => {
            this.pop.open(err.message);
            return of([]);
        })).pipe(map((response) => {
            return JSON.parse(response);
        }));
    }

    getTenderDescription(id) {
        const url = this.baseURL + '/' + id;
        return this.apiCall(url);
    }
}
