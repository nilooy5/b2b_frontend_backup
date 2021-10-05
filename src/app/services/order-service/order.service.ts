import {Injectable} from '@angular/core';
import {Service} from '../../types/services';
import {ShebaHttpService} from '../../modules/sheba-http/sheba-http.service';
import {Partner} from '../../types/users';
import {StorageService} from '../storage.service';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {OrderPlaceObject} from '../../types/orders';

@Injectable({
    providedIn: 'root'
})
export class OrderService implements Resolve<Observable<any>> {
    subcategory: any = null;
    services: any[] = [];
    partner: any = null;
    order: OrderPlaceObject = null;
    time: any = null;
    date: any = null;
    orderDetails: any = null;
    voucher: any = null;
    issue: any = null;
    additionalInformation: any = null;
    serviceDetails: any = null;

    constructor(private http: ShebaHttpService,
                private storage: StorageService) { }

    init() {
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

    getOrders(filter?: string) {
        if (filter) {
            filter = '?filter=' + filter;
        } else {
            filter = '';
        }
        return this.http.get('v2/businesses/' + this.storage.user.business_id + '/orders' + filter);
    }

    getOrder(id: string | number) {
        return this.http.get('v2/businesses/' + this.storage.user.business_id + '/orders/' + id).pipe(map(res => {
            return res.code === 200 ? res.order : null;
        }));
    }

    getOrderBill(id: string | number) {
        return this.http.get('v2/businesses/' + this.storage.user.business_id + '/orders/' + id + '/bills');
    }

    verifyPayment(invoice_id: string) {
        return this.http.post('v2/transactions/' + invoice_id, {invoice_id: invoice_id});
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
        if (route.params.order_id) {
            return this.getOrder(route.params.order_id);
        }
        return this.getOrders().pipe(map(res => {
            return res.code === 200 ? res.orders : [];
        }));
    }

    set OrderPlaceObject(order: any) {
        this.order = Object.assign(this.order ? this.order : {}, order);
    }

    get OrderPlaceObject() {
        let services = [];
        this.Services.forEach(service => {
            services.push({
                id: service.id,
                option: service.options || [],
                quantity: service.quantity
            });
        });
        const data =  {
            services: JSON.stringify(services),
            partner: this.Partner.id,
            date: this.Date,
            time: this.Time.key,
            additional_information: this.AdditionalInformation ? this.AdditionalInformation : null
        };
        if (this.issue) { data['issue_id'] = parseInt(this.issue, 10); }

        return data;
    }

    set SubCategory(category: any) {
        this.subcategory = category;
        this.updateStorage('subcategory', this.subcategory);
    }

    get SubCategory() {
        const _subcategory = this.storage.Order.subcategory;
        return _subcategory || this.subcategory;
    }

    set Services(services: any) {
        this.services = services;
        this.updateStorage('services', this.services);
    }

    get Services() {
        const _services = this.storage.Order.services;
        return _services || this.services;
    }

    set Partner(partner: any) {
        this.partner = partner;
        this.updateStorage('partner', this.partner);
    }

    get Partner() {
        const _partner = this.storage.Order.partner;
        return _partner || this.partner;
    }

    set ServiceDetails(serviceDetails: any) {
        this.serviceDetails = serviceDetails;
        this.updateStorage('serviceDetails', this.serviceDetails);
    }

    get ServiceDetails() {
        const serviceDetails = this.storage.Order.serviceDetails;
        return serviceDetails || this.serviceDetails;
    }

    set AdditionalInformation(additionalInformation: any) {
        this.additionalInformation = additionalInformation;
        this.updateStorage('additionalInformation', this.additionalInformation);
    }

    get AdditionalInformation() {
        const _additionalInformation = this.storage.Order.additionalInformation;
        return _additionalInformation || this.additionalInformation;
    }

    set Date(date: any) {
        this.date = this.getApiFormat(date);
        this.updateStorage('date', this.date);
    }

    get Date() {
        const _date = this.storage.Order.date;
        return _date || this.date;
    }

    set Time(time: any) {
        this.time = time;
        this.updateStorage('time', this.time);
    }

    get Time() {
        const _time = this.storage.Order.time;
        return _time || this.time;
    }

    set Voucher(voucher: any) {
        this.voucher = voucher;
        this.updateStorage('voucher', this.voucher);
    }

    get Voucher() {
        const _voucher = this.storage.Order.voucher;
        return _voucher || this.voucher;
    }

    set Issue(issue: any) {
        this.issue = issue;
        this.updateStorage('issue', this.issue);
    }

    get Issue() {
        const _issue = this.storage.Order.issue;
        return _issue || this.issue;
    }

    set OrderDetails(orderDetails: any) {
        this.orderDetails = orderDetails;
        this.updateStorage('orderDetails', this.orderDetails);
    }

    get OrderDetails() {
        const _orderDetails = this.storage.Order.orderDetails;
        return _orderDetails || this.orderDetails;
    }

    getApiFormat(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }

    public reset() {
        this.subcategory = null;
        this.services = [];
        this.partner = null;
        this.order = null;
        this.time = null;
        this.date = null;
        this.voucher = null;
        this.storage.resetOrderObject();
    }

    public deleteOrderObject() {
        this.storage.deleteOrderObject();
    }

    updateStorage(key, value) {
        this.storage.updateOrderObject(key, value);
    }

    resetStorage() {
        this.init();
        this.storage.resetOrderObject();
    }

}
