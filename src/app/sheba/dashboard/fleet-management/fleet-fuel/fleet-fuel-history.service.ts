import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {ShebaHttpService} from '../../../../modules/sheba-http/sheba-http.service';
import {catchError, map} from 'rxjs/operators';
import {StorageService} from '../../../../services/storage.service';
import {isUndefined} from 'util';

@Injectable({
    providedIn: 'root'
})
export class FleetFuelHistoryService implements Resolve<Observable<any>> {

    private start_date = new Date((new Date()).getTime() - (60*60*24*7*1000));
    private end_date = new Date();

    constructor(
        private http: ShebaHttpService,
        private storage: StorageService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
        return this.getFuelHistory();
    }

    getFuelHistory() {
        return this.http.get('v2/businesses/' + this.storage.user.business_id + '/fuel-logs?offset=0&limit=10&start_date=' + this.getApiFormat(this.start_date) + '&end_date=' + this.getApiFormat(this.end_date)).pipe(catchError(err => {
            return of([]);
        })).pipe(map(res => {
            return {
                logs: res.logs_lists,
                info: {
                    total_fuel_cost: res.total_fuel_cost,
                    total_gallons: res.total_gallons,
                    total_litres: res.total_litres,
                }
            };
        }));
    }

    getApiFormat(date) {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) { month = '0' + month; }
        if (day.length < 2) { day = '0' + day; }

        return [year, month, day].join('-');
    }
}
