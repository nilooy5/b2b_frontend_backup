import {Inject, Injectable, OnInit} from '@angular/core';
import {StorageService} from './storage.service';
import {WINDOW} from '@ng-toolkit/universal';
import amplitude from 'amplitude-js';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AmplitudeService implements OnInit {
    public events = {
        quick_purchase: 'Quick_Purchase',
        quick_purchase_category: 'Master_Category',
        quick_purchase_service: 'Select_Service',
        quick_purchase_partner: 'Select_SP',
        quick_purchase_schedule: 'Select_Schedule',
        quick_purchase_order: 'Place_Order',
        inpage_free_trial: 'inpage_free_trial1',
        download_app: 'download_app',
        watch_demo: 'watch_demo',
        subscribe: 'subscribe',
        send_msg: 'send_msg',
        view_page: 'View_page'
    };

    constructor(
        private storage: StorageService,
        @Inject(WINDOW) private window,
    ) {
        // console.log(environment.amplitude_id)
        amplitude.init(environment.amplitude_id);
        this.setUser();
    }

    setUser() {
        amplitude.setUserId(this.storage.user ? this.storage.user.business_id : null);
    }

    fireAmplitudePageViewEvent(pageData) {
        amplitude.getInstance().logEvent('PAGE VIEW', pageData);
    }

    fireCustomEvent(name, data) {
        amplitude.getInstance().logEvent(name, data);
    }

    ngOnInit(): void {
    }
}
