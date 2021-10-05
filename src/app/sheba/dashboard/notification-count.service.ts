import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NotificationCountService {

    private notificationCountSource = new Subject<any>();
    currentNotificationCount = this.notificationCountSource.asObservable();

    private notificationSeenStatusSource = new Subject<any>();
    currentNotificationSeenStatus = this.notificationSeenStatusSource.asObservable();

    constructor() { }

    changeNotificationCount(notificationCount: any) {
        this.notificationCountSource.next(notificationCount);
    }

    changeNotificationSeenStatus(notificationId: any) {
        this.notificationSeenStatusSource.next(notificationId);
    }
}
