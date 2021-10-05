import { Injectable } from '@angular/core';
import { ShebaHttpService } from '../../../../modules/sheba-http/sheba-http.service';
import { StorageService } from '../../../../services/storage.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {SupportListComponent} from './support-list.component';

@Injectable({
  providedIn: 'root'
})

export class SupportListService {

    constructor(private http: ShebaHttpService,
                private storage: StorageService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
        return this.getSupportList();
    }

    getSupportList() {
        let url = 'v2/businesses/' + this.storage.user.business_id + '/supports';
        url += '?offset=0&limit=' + SupportListComponent.ITEMS_PER_PAGE + '&status=open';

        return this.http.get(url).pipe(catchError(err => {
                return of([]);
            })).pipe(map(res => {
                return res;
            }));
    }
}
