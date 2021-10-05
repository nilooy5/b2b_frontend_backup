import { Injectable } from '@angular/core';
import {OfficeSettingsService} from './office-settings.service';
import {ActivatedRouteSnapshot} from '@angular/router';
import {forkJoin, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OfficeSettingsAttendanceResolverService {

  constructor(private officeTimeService: OfficeSettingsService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
        return forkJoin([
            this.officeTimeService.getAttendanceSettingInfo()
        ]).pipe(map((result) => {
            const [{attendance_type_info}] = result;
            return result;
        }));
    }
}
