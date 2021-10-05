import { Injectable } from '@angular/core';
import {ShebaHttpService} from "../../../../modules/sheba-http/sheba-http.service";
import {StorageService} from "../../../../services/storage.service";
import {ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable, of} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {Announcement} from "../../../../models/announcement";

@Injectable({
    providedIn: 'root'
})
export class AnnouncementsDetailsService {

    constructor(private http: ShebaHttpService,
                private storage: StorageService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
        return this.find(route.params.announcement_id);
    }

    find(id) {
        return this.http.get('v2/businesses/' + this.storage.user.business_id + '/announcements/' + id)
            .pipe(catchError(err => {
                return of([]);
            })).pipe(map(res => {
                if(res.code !== 200) return null;
                return new Announcement(res.announcement);
            }));
    }

    update(id, data) {
        return this.http.put('v2/businesses/' + this.storage.user.business_id + '/announcements/' + id, data);
    }
}
