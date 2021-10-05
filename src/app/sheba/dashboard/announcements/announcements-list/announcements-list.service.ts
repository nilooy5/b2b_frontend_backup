import { Injectable } from '@angular/core';
import { ExpenseListComponent} from '../../expense/expense-list/expense-list.component';
import {catchError, map} from 'rxjs/operators';
import {forkJoin, Observable, of} from 'rxjs';
import {ShebaHttpService} from '../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../services/storage.service';
import {Announcement} from '../../../../models/announcement';
import { PopAlertService } from '../../../../modules/pop-alert/pop-alert.service';
import { ITEMS_PER_PAGE } from './announcemnts-list.constants';
import {Resolve} from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class AnnouncementsListService implements Resolve<Observable<any>> {

    constructor(private http: ShebaHttpService,
                private pop: PopAlertService,
                private storage: StorageService) { }

    resolve(): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
        return this.getAnnouncementsList();
    }

    getAnnouncementsList() {
        const params = {
            limit: ITEMS_PER_PAGE,
            offset: 0,
            status: 'Ongoing'
        };
        return this.apiCall(this.getBaseUrl(), params);
    }

    getFilteredAnnouncementsList(filters) {
        return this.apiCall(this.getBaseUrl(), filters);
    }

    private getBaseUrl() {
        return 'v2/businesses/' + this.storage.user.business_id + '/announcements';
    }

    private apiCall(url, params) {
        return this.http.get(url, { params, responseType: 'text' }).pipe(catchError(err => {
            this.pop.open(err.message);
            return of([]);
        })).pipe(map((response) => {
            const  { announcements, totalAnnouncements } = JSON.parse(response);
            return { announcements, totalAnnouncements };
        }));
    }
}
