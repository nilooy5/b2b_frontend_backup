import { Injectable } from '@angular/core';
import {OfficeSettingsService} from './office-settings.service';
import {ActivatedRouteSnapshot} from '@angular/router';
import {forkJoin, Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OfficeSettingsDayTimeResolverService {

  constructor(private officeTimeService: OfficeSettingsService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
        return forkJoin([
            this.officeTimeService.getOfficeTimeInfo()
        ]).pipe(map((result) => {
            return result;
        }));
    }
}
