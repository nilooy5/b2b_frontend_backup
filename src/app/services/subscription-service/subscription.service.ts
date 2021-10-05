import { Injectable } from '@angular/core';
import {StorageService} from '../storage.service';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SubscriptionService {
    private subscription: any = null;
    private partner: any = null;
    private services: Array<any> = [];
    private additional: string;
    private dates: Array<string> = [];
    private order = null;
    private time = null;

    public serviceWatcher: BehaviorSubject<any> = new BehaviorSubject(false);

    constructor(
        private storage: StorageService
    ) {
        this.init();
    }

    init() {
        this.subscription = null;
        this.partner = null;
        this.additional = null;
        this.dates = [];
        this.services = [];
        this.order = null;
        this.time = null;
    }

    set Subscription(sub: any) {
        this.subscription = sub;
        this.updateStorage('subscription', this.subscription);
    }
    get Subscription() {
        return this.storage.Subscription.subscription || this.subscription;
    }

    set Partner(sub: any) {
        this.partner = sub;
        this.updateStorage('partner', this.partner);
    }
    get Partner() {
        return this.storage.Subscription.partner || this.partner;
    }

    set Services(services: Array<any>) {
        this.services = services;
        this.serviceWatcher.next(this.services);
        this.updateStorage('services', this.services);
    }
    get Services() {
        return this.storage.Subscription.services || this.services;
    }

    set Additional(additional: string) {
        this.additional = additional;
        this.updateStorage('additional', this.additional);
    }
    get Additional() {
        return this.storage.Subscription.additional || this.additional;
    }

    set Dates(dates: Array<string>) {
        this.dates = dates;
        this.updateStorage('dates', this.dates);
    }
    get Dates() {
        return this.storage.Subscription.dates || this.dates;
    }

    set Time(time: Array<string>) {
        this.time = time;
        this.updateStorage('time', this.time);
    }
    get Time() {
        return this.storage.Subscription.time || this.time;
    }

    set Order(order: any) {
        this.order = order;
        this.updateStorage('order', this.order);
    }
    get Order() {
        return this.storage.Subscription.order || this.order;
    }

    updateStorage(key, value) {
        this.storage.updateSubscriptionObject(key, value);
    }

    clearStorage() {
        this.init();
        this.storage.removeSubscriptionObject();
    }
}
