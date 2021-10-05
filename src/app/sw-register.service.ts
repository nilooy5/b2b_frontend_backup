import {Injectable} from '@angular/core';
import {ShebaHttpService} from './modules/sheba-http/sheba-http.service';
import {urlBase64ToUint8Array} from './helpers/functions';
import {StorageService} from './services/storage.service';


@Injectable({
    providedIn: 'root'
})

export class SwRegisterService {

    isSubscribed = false;
    swRegistration: ServiceWorkerRegistration = null;
    applicationServerPublicKey = 'BFO7c5O0Ze_V4UFwgQvu_XTAOaVoxOPCvc2Zl3EazKWiWMuohizwWvYw1ZDWUsO2XNWadgklzdGNbiCdseSAkaQ';

    constructor(private http: ShebaHttpService,
                private storage: StorageService) {
    }


    registerServiceWorker() {
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            navigator.serviceWorker.register('/sw.js')
                .then((registration) => {
                    this.swRegistration = registration;
                    this.subscribeUser();
                }).catch((err) => {
                console.log('Service Worker Failed to Register', err);
            });
            if (Notification.permission !== 'granted') {
                Notification.requestPermission().then(r => console.log(r));
            }
        } else {
            console.warn('Push messaging is not supported');
        }
    }

    subscribeUser() {
        const applicationServerKey = urlBase64ToUint8Array(this.applicationServerPublicKey);
        this.swRegistration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey
        }).then((subscription) => {
            this.updateSubscriptionOnServer(subscription);
            this.isSubscribed = true;
        }).catch((err) => {
            console.error('Failed to subscribe the user: ', err);
        });
    }

    updateSubscriptionOnServer(subscription) {
        if (subscription) {
            const data = {
                subscriber_id: this.storage.user.member_id,
                subscriber_type: 'member',
                device: JSON.stringify(subscription)
            };
            this.http.post('v2/subscription', data).toPromise().then(res => {
            });
        }
    }
}
