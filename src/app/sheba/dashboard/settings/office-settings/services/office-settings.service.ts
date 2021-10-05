import { Injectable } from '@angular/core';
import {ShebaHttpService} from '../../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../../services/storage.service';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs';
import {PopAlertService} from '../../../../../modules/pop-alert/pop-alert.service';

@Injectable({
  providedIn: 'root'
})
export class OfficeSettingsService {

    baseUrl = 'v2/businesses/' + this.storage.user.business_id;

    constructor(
        private http: ShebaHttpService,
        private storage: StorageService,
        private pop: PopAlertService
    ) { }

    getOfficeTimeInfo() {
        const url =  this.baseUrl + '/office-time';
        return this.http.get(url).pipe(catchError(err => {
            this.pop.open(err.message);
            return of ([]);
        }));
    }

    getAttendanceSettingInfo() {
        const url =  this.baseUrl + '/attendance-setting';
        return this.http.get(url).pipe(catchError(err => {
            this.pop.open(err.message);
            return of ([]);
        }));
    }

    updateOfficeTime(data: any) {
        return this.http.post('v2/businesses/' + this.storage.user.business_id + '/office-time/update', data);
    }
}
