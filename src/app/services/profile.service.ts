import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router/src/interfaces';
import {Observable, of} from 'rxjs';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {StorageService} from './storage.service';
import {ShebaHttpService} from '../modules/sheba-http/sheba-http.service';
import {catchError, map, tap} from 'rxjs/operators';
import {Announcement} from '../models/announcement';

@Injectable({
    providedIn: 'root'
})

export class ProfileService implements Resolve<Observable<any>> {

    constructor(
        private storage: StorageService,
        private http: ShebaHttpService
    ) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
        if (route.routeConfig.path === 'profile') {
            return this.getProfile();
        } else if (route.routeConfig.path === 'company-profile') {
            return this.getBusinessInfo();
        }
    }

    getProfile() {
        return this.http.get('v2/members/' + this.storage.user.member_id + '/info');
    }

    getBusinessInfo() {
        return this.http.get('v2/members/' + this.storage.user.member_id + '/get-business-info').pipe(map(res => {
            return res.code === 200 ? res.info : null;
        }), tap((res) => {
            this.storage.setData('business_info', res);
        }));
    }

    setProfileToStorage(res: any) {
        if (res.code === 200) {
            const user = this.storage.user;
            Object.assign(user, res.info);
            this.storage.user = user;
        }
    }
}
