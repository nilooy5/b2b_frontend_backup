import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { Company, Partner, User } from '../types/users';
import {BehaviorSubject, Observable, Subject, interval } from 'rxjs';
import { appConfig } from '../config/app.config';
import { Service } from '../types/services';
import { Tender as TenderModel } from '../models/tender';
import { RfqStorageInitialization } from './rfq-storage-service/rfq-storage-initialization';
import {RfqInviteStorageInitialization} from './rfq-invite-storage-service/rfq-invite-storage-initialization';
import {CoWorkerStorageInitialization} from './co-workers-storage-service/co-worker-storage-initialization';

class Order {
    time: string;
    services: Service[];
    subcategory: any;
    partner: Partner;
    order: number;
    date: string;
    orderDetails: any;
    voucher: any;
    issue: any;
    additionalInformation: any;
    serviceDetails: any;

    constructor() {
        this.subcategory = null;
        this.services = [];
        this.partner = null;
        this.order = null;
        this.time = null;
        this.date = null;
        this.orderDetails = null;
        this.voucher = null;
        this.issue = null;
        this.additionalInformation = null;
        this.serviceDetails = null;
    }

    set(item: string, value) {
        this[item] = value;
    }

    get(): Order {
        return {
            subcategory: this.subcategory,
            services: this.services,
            partner: this.partner,
            order: this.order,
            time: this.time,
            date: this.date,
            orderDetails: this.orderDetails,
            voucher: this.voucher,
            issue: this.issue,
            additionalInformation: this.additionalInformation,
            serviceDetails: this.serviceDetails
        } as Order;
    }

    reset() {
        this.subcategory = null;
        this.services = [];
        this.partner = null;
        this.order = null;
        this.time = null;
        this.date = null;
        this.orderDetails = null;
        this.voucher = null;
        this.issue = null;
        this.additionalInformation = null;
        this.serviceDetails = null;
    }
}

class Tender {
    title: string;
    additionalInformation: any;
    priceQuotation: any[];
    _tender: TenderModel;
    companyEvaluationData: any[];
    technicalEvaluationData: any[];

    constructor() {
        this.init();
    }

    set(item: string, value) {
        this[item] = value;
    }

    init() {
        const tenderFromSession = sessionStorage.getItem('tender') && sessionStorage.getItem('tender') !== undefined ?
            JSON.parse(sessionStorage.getItem('tender')) : null;

        this._tender = tenderFromSession ? tenderFromSession._tender : null;
        this.priceQuotation = tenderFromSession ? tenderFromSession.priceQuotation : null;
        this.additionalInformation = tenderFromSession ? tenderFromSession.additionalInformation : null;
        this.companyEvaluationData = tenderFromSession ? tenderFromSession.companyEvaluationDaFta : null;
        this.technicalEvaluationData = tenderFromSession ? tenderFromSession.technicalEvaluationData : null;
    }

    removeAll() {
        this.reset();
    }

    public getLocalObject() {
        return {
            _tender: this._tender,
            title: this.title,
            priceQuotation: this.priceQuotation,
            additionalInformation: this.additionalInformation,
            companyEvaluationData: this.companyEvaluationData,
            technicalEvaluationData: this.technicalEvaluationData
        };
    }

    get() {
        // tslint:disable-next-line:max-line-length
        const tenderFromSession = sessionStorage.getItem('tender') && sessionStorage.getItem('tender') !== undefined ?
            JSON.parse(sessionStorage.getItem('tender')) : null;

        const tenderFromClass = this.getLocalObject();

        return tenderFromSession || tenderFromClass;
    }

    reset() {
        this._tender = null;
        this.additionalInformation = null;
        this.priceQuotation = null;
        this.companyEvaluationData = null;
        this.technicalEvaluationData = null;
    }
}

class Subscription {
    subscription: any;
    partner: any;
    additional: any;
    dates: any;
    time: any;
    services: any;
    order: any;

    constructor() {
        this.init();
    }

    set(item: string, value) {
        this[item] = value;
    }

    init() {
        this.subscription = null;
        this.partner = null;
        this.additional = null;
        this.dates = null;
        this.time = null;
        this.services = null;
        this.order = null;
    }

    removeAll() {
        this.init();
    }

    public getLocalObject() {
        return {
            subscription: this.subscription,
            partner: this.partner,
            additional: this.additional,
            dates: this.dates,
            time: this.time,
            services: this.services,
            order: this.order,
        };
    }

    get() {
        // tslint:disable-next-line:max-line-length
        const subscriptionFromSession = sessionStorage.getItem('subscription') && sessionStorage.getItem('subscription') !== undefined ?
            JSON.parse(sessionStorage.getItem('subscription')) : null;

        const subscriptionFromClass = this.getLocalObject();

        return subscriptionFromSession || subscriptionFromClass;
    }
}

class TenderParticipate {

    basicForm: any;
    priceQuotation: any;
    companyEvaluation: any;
    technicalEvaluation: any;

    constructor() {
        this.init();
    }

    set(item: string, value) {
        this[item] = value;
    }

    init() {
        if (sessionStorage.getItem('tender-participate')) {
            this.basicForm = JSON.parse(sessionStorage.getItem('tender-participate')).basicForm;
            this.priceQuotation = JSON.parse(sessionStorage.getItem('tender-participate')).priceQuotation;
            this.companyEvaluation = JSON.parse(sessionStorage.getItem('tender-participate')).companyEvaluation;
            this.technicalEvaluation = JSON.parse(sessionStorage.getItem('tender-participate')).technicalEvaluation;
        } else {
            this.basicForm = null;
            this.priceQuotation = null;
            this.companyEvaluation = null;
            this.technicalEvaluation = null;
        }
    }

    removeAll() {
        this.init();
    }

    public getLocalObject() {
        return {
            basicForm: this.basicForm,
            priceQuotation: this.priceQuotation,
            companyEvaluation: this.companyEvaluation,
            technicalEvaluation: this.technicalEvaluation
        };

    }

    get() {
        // tslint:disable-next-line:max-line-length
        const participateFromSession = sessionStorage.getItem('tender-participate') && sessionStorage.getItem('tender-participate') !== undefined ? JSON.parse(sessionStorage.getItem('tender-participate')) : null;

        const participateFromClass = this.getLocalObject();

        return participateFromSession || participateFromClass;
    }
}

@Injectable({
    providedIn: 'root'
})

export class StorageService {
    private User: User;
    storage$: BehaviorSubject<{ update: boolean }>;
    loggedIn$: BehaviorSubject<{ user: User }>;
    order: Order;
    tender: Tender;
    rfq: RfqStorageInitialization;
    rfqInvite: RfqInviteStorageInitialization;
    tenderParticipate: TenderParticipate;
    subscription: Subscription;
    co_worker: CoWorkerStorageInitialization;
    procurementBidCompareIndexes: number[] = [0, 1, 2];
    private storageSub = new Subject<any>();

    public userWatcher: BehaviorSubject<any> = new BehaviorSubject(false);
    public procurementBidCompareIndexesWatcher: BehaviorSubject<any> = new BehaviorSubject(false);

    constructor(@Inject(LOCAL_STORAGE) private storage) {
        this.storage$ = new BehaviorSubject<{ update: boolean }>({update: false});
        this.loggedIn$ = new BehaviorSubject<{ user: User }>({user: this.user});
        this.user = this.getData(appConfig.defaultUserCookiePath);
        this.loggedIn$.next({user: this.user});
        this.order = new Order();
        this.tender = new Tender();
        this.rfq = new RfqStorageInitialization();
        this.rfqInvite = new RfqInviteStorageInitialization();
        this.tenderParticipate = new TenderParticipate();
        this.subscription = new Subscription();
        this.co_worker = new CoWorkerStorageInitialization();
        this.setOrder();
    }

    setOrder() {
        const data = this.getData('order');
        if (data) {
            Object.keys(data).forEach(key => {
                this.order.set(key, data[key]);
            });
        }
    }

    setData(path: string, data: any) {
        this.storage.setItem(path, JSON.stringify(data));
        this.userWatcher.next(this.User);
    }

    updateCompany(company: Company) {
        // this.user.company = company;
        this.setData('user', this.user);
        this.storage$.next({update: true});
    }

    getData(path: string) {
        const data = this.storage.getItem(path);
        try {
            return JSON.parse(data);
        } catch (e) {
            return data;
        }
    }

    clear() {
        this.storage.clear();
    }

    removeData() {
        this.storage.clear();
        this.user = null;
        this.loggedIn$.next({user: null});
    }

    set user(user: User | null) {
        this.User = user as User;
        this.storage$.next({update: true});
        this.setData(appConfig.defaultUserCookiePath, user);
        this.userWatcher.next(this.User);
    }

    get user(): User {
        return this.User;
    }

    get user_type(): 'b2b' | null {
        return 'b2b';
    }

    get user$(): Observable<User> {
        return new Observable(observe => {
            const interval = setInterval(() => {
                if (!this.User) {
                    observe.next(null);
                    observe.complete();
                    clearInterval(interval);
                } else {
                    observe.next(this.User)
                }
            }, 100);
        });
    }

    set ProcurementBidCompareIndexes(procurementBidCompareIndexes: number[] | null) {
        this.procurementBidCompareIndexes = procurementBidCompareIndexes as number[];
        this.storage$.next({update: true});
        this.setData(appConfig.defaultProcurementBidCompareIndexCookiePath, procurementBidCompareIndexes);
        this.procurementBidCompareIndexesWatcher.next(this.procurementBidCompareIndexes);
    }
    get ProcurementBidCompareIndexes(): number[] {
        return this.procurementBidCompareIndexes;
    }


    /* Order Journey */
    createOrderObject(data) {
        this.storage.setItem('order', JSON.stringify(data));
    }
    updateOrderObject(key, value) {
        this.order.set(key, value);
        this.setData('order', this.order.get());
    }
    deleteOrderObject() {
        this.storage.removeItem('order');
    }
    resetOrderObject() {
        this.order.reset();
        this.setData('order', this.order.get());
    }
    get Order() {
        return this.order.get();
    }

    /* Tender */
    get Tender() {
        return this.tender.get();
    }
    updateTenderObject(key, value) {
        this.tender.set(key, value);
        this.setData('tender', this.tender.getLocalObject());
        sessionStorage.setItem('tender', JSON.stringify(this.tender.getLocalObject()));
    }
    removeTenderObject() {
        this.tender.removeAll();
        this.storage.tender = null;
        this.storage.removeItem('tender');
        sessionStorage.removeItem('tender');
    }

    /* RFQ */
    watchStorage(): Observable<any> {
        return this.storageSub.asObservable();
    }
    get Rfq() {
        return this.rfq.get();
    }
    updateRfqObject(key, value) {
        this.rfq.set(key, value);
        this.setData('rfq', this.rfq.getRfqObject());
        this.storageSub.next(this.rfq.getRfqObject());
    }
    removeRfqObject() {
        this.rfq.removeAll();
        this.storage.rfq = null;
        this.storage.removeItem('rfq');
        this.storageSub.next(this.rfq.getRfqObject());
    }
    resetRfqObject() {
        this.rfq.resetRfqObject();
        this.setData('rfq', this.rfq.getRfqObject());
        this.storageSub.next(this.rfq.getRfqObject());
    }

    // get Rfq() {
    //     return this.rfq.get();
    // }
    // updateRfqObject(key, value) {
    //     this.rfq.set(key, value);
    //     this.setData('rfq', this.rfq.getLocalObject());
    //     // localStorage.setItem('rfq', JSON.stringify(this.rfq.getLocalObject()));
    // }
    // removeRfqObject() {
    //     this.rfq.resetRfqObject();
    //     this.storage.rfq = null;
    //     this.storage.removeItem('rfq');
    // }
    // resetRfqObject() {
    //     this.rfq.resetRfqObject();
    //     this.setData('rfq', this.rfq.getLocalObject());
    // }+

    /* RFQ Invite */
    get RfqInvite() {
        return this.rfqInvite.get();
    }
    updateRfqInviteObject(key, value) {
        this.rfqInvite.set(key, value);
        sessionStorage.setItem('rfq-invite', JSON.stringify(this.rfqInvite.getRfqInviteObject()));
    }
    removeRfqInviteObject() {
        this.rfqInvite.removeAll();
        sessionStorage.removeItem('rfq-invite');
    }
    resetRfqInviteObject() {
        this.rfqInvite.resetRfqInviteObject();
        sessionStorage.setItem('rfq-invite', JSON.stringify(this.rfqInvite.getRfqInviteObject()));
    }

    /* Tender Advanced Proposal */

    get TenderParticipate() {
        return this.tenderParticipate.get();
    }
    updateTenderParticipateObject(key, value) {
        this.tenderParticipate.set(key, value);
        this.setData('tender-participate', this.tenderParticipate.getLocalObject());
        sessionStorage.setItem('tender-participate', JSON.stringify(this.tenderParticipate.getLocalObject()));
    }
    removeTenderParticipateObject() {
        this.tenderParticipate.removeAll();
        sessionStorage.removeItem('tender-participate');
        localStorage.removeItem('tender-participate');
    }

    /* Subscription */
    get Subscription() {
        return this.subscription.get();
    }
    updateSubscriptionObject(key, value) {
        this.subscription.set(key, value);
        this.setData('subscription', this.subscription.getLocalObject());
        sessionStorage.setItem('subscription', JSON.stringify(this.subscription.getLocalObject()));
    }
    removeSubscriptionObject() {
        this.subscription.removeAll();
        sessionStorage.removeItem('subscription');
        localStorage.removeItem('subscription');
    }


    /* Co-Worker */

    get CoWorker() {
        return this.co_worker.get();
    }

    updateCoWorkerObject(key, value) {
        this.co_worker.set(key, value);
        sessionStorage.setItem('co-worker', JSON.stringify(this.co_worker.getCoWorkerObject()));
    }

    removeCoWorkerObject() {
        this.co_worker.removeAll();
        sessionStorage.removeItem('co-worker');
    }

    resetCoWorkerObject() {
        this.co_worker.resetCoWorkerObject();
        sessionStorage.setItem('co-worker', JSON.stringify(this.co_worker.getCoWorkerObject()));
    }
}
