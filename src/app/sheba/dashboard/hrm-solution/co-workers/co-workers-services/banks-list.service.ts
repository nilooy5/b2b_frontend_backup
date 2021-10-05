import { Injectable } from '@angular/core';
import { ShebaHttpService } from '../../../../../modules/sheba-http/sheba-http.service';
import { PopAlertService } from '../../../../../modules/pop-alert/pop-alert.service';
import { StorageService } from '../../../../../services/storage.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Resolve } from '@angular/router';
import { Banks } from '../../../../../types/co-workers';

@Injectable({
  providedIn: 'root'
})

export class BanksListService implements Resolve<Banks[]> {

    constructor(private http: ShebaHttpService,
                private pop: PopAlertService,
                private storage: StorageService) { }

    resolve(): Observable<Banks[]> {
        return this.getBanksList();
    }

    getBanksList() {
        const url = 'v2/businesses/' + this.storage.user.business_id + '/banks';
        return this.http.get(url).pipe(catchError(err => {
            this.pop.open(err.message);
            return of([]);
        })).pipe(map((response) => {
            return response.banks;
        }));
    }

}
