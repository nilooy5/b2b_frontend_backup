import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { StorageService } from '../../../../services/storage.service';
import { NotificationsService } from '../notifications.service';
import { PopAlertService } from '../../../../modules/pop-alert/pop-alert.service';
import { ShebaHttpService } from '../../../../modules/sheba-http/sheba-http.service';
import { Router } from '@angular/router';
import {NotificationCountService} from '../../notification-count.service';
import {getErrorMessage} from '../../../../helpers/functions';

@Component({
    selector: 'app-notifications-content',
    templateUrl: './notifications-content.component.html',
    styleUrls: ['./notifications-content.component.scss']
})

export class NotificationsContentComponent implements OnInit {

    notificationList;
    @Output() notificationLength = new EventEmitter<any>();

    constructor(private storage: StorageService,
                private router: Router,
                private notificationService: NotificationsService,
                private notifyCount: NotificationCountService,
                private pop: PopAlertService,
                private http: ShebaHttpService) {

        this.notificationService.notify.asObservable().subscribe((res) => {
            this.setData();
        });

        this.notifyCount.currentNotificationCount.subscribe((res) => {
            this.setData();
        });

        this.notifyCount.currentNotificationSeenStatus.subscribe((notificationId) => {
            this.onClickRead(notificationId);
        });

    }

    ngOnInit() { }

    setData() {
        this.notificationService.getNotificationList().subscribe(res => {
            try {
                const items = res.filter((item) => {
                    return item.is_seen === 0;
                });
                this.notificationLength.emit(items.length);
                this.notificationList = res;
            } catch (e) {
                this.pop.open(getErrorMessage(e));
            }
        });
    }

    onClickNotification(data) {

        if (data.event_type === 'vehicle') {
            if (data.is_seen === 0) {
                this.onClickRead(data.id);
                this.router.navigate(['/', 'dashboard', 'fleet-management', 'vehicle',  data.event_id, 'info']);
            }
            this.router.navigate(['/', 'dashboard', 'fleet-management', 'vehicle',  data.event_id, 'info']);
        }
        if (data.event_type === 'driver') {
            if (data.is_seen === 0) {
                this.onClickRead(data.id);
                this.router.navigate(['/', 'dashboard', 'fleet-management', 'drivers',  data.event_id, 'info']);
            }
            this.router.navigate(['/', 'dashboard', 'fleet-management', 'drivers',  data.event_id, 'info']);
        }
        if (data.event_type === 'support') {
            if (data.is_seen === 0) {
                this.onClickRead(data.id);
                this.router.navigate(['/', 'dashboard', 'support',  data.event_id]);
            }
            this.router.navigate(['/', 'dashboard', 'support', data.event_id]);
        }

        if (data.is_seen === 0) {
            this.onClickRead(data.id);
            window.open(data.link);
        }
        window.open(data.link);
    }

    onClickRead(notificationsId) {
        this.http.post('v2/businesses/' + this.storage.user.business_id + '/notifications/' + notificationsId + '/seen', 1)
            .toPromise().then(res => {
            if (res.code === 200) {
                this.notificationService.notify.next(res);
            } else {
                this.pop.open(res.message);
            }
        });
    }
}
