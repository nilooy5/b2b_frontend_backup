import { Injectable } from '@angular/core';
import {BehaviorSubject, of} from 'rxjs';
import { ShebaHttpService } from '../../../modules/sheba-http/sheba-http.service';
import { StorageService } from '../../../services/storage.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class NotificationsService {
    public notify: BehaviorSubject<any> = new BehaviorSubject(false);
    constructor(private http: ShebaHttpService, private storage: StorageService) {}

    getNotificationList() {
        return this.http.get('v2/businesses/' + this.storage.user.business_id + '/notifications').pipe(catchError(err => {
            return of([]);
        })).pipe(map(res => {
            return res.notifications;
        }));
    }
}
