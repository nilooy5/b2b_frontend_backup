import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../../../services/order-service/order.service';
import {ShebaHttpService} from '../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../services/storage.service';
import {getErrorMessage} from '../../../../helpers/functions';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {ConfirmationModalComponent} from '../../../modals/confirmation-modal/confirmation-modal.component';
import {MONTHS, WeekDays} from "../../../../helpers/constants";
import {AmplitudeService} from '../../../../services/amplitude.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss']
})


export class CheckoutComponent implements OnInit {

    monthNames: string[] = MONTHS;
    weekdays: string[] = WeekDays;
    public placingOrder = false;
    applyingPromo = false;
    promoKey: string = null;

    contactInfoForm: FormGroup;
    showValidationError = false;

    constructor(
        public orderService: OrderService,
        private http: ShebaHttpService,
        private storage: StorageService,
        private router: Router,
        public dialog: MatDialog,
        private formBuilder: FormBuilder,
        private amplitude: AmplitudeService
    ) {
        this.constructContactInfoForm();
    }

    ngOnInit() {
    }

    constructContactInfoForm() {
        const businessMemberMobile = this.storage.user.mobile && this.storage.user.mobile.startsWith('+88') ? this.storage.user.mobile.slice(3) : this.storage.user.mobile;
        const businessMemberName = this.storage.user.name;
        this.contactInfoForm = this.formBuilder.group({
            delivery_name:  [ businessMemberName ? businessMemberName : null, Validators.required],
            mobile: [ businessMemberMobile ? businessMemberMobile : null, [ Validators.required, Validators.pattern('^01\\d{9}$')]]
        });
    }

    get ContactInfoFormControls() {
        return this.contactInfoForm.controls;
    }

    placeOrder() {
        if (this.contactInfoForm.invalid) {
            this.showValidationError = true;
            return;
        }


        this.placingOrder = true;
        const orderObject = {
            ...this.orderService.OrderPlaceObject,
            ...this.contactInfoForm.value,
            voucher: this.orderService.Voucher ? this.orderService.Voucher.id : null
        };
        this.fireAmplitudeEvent();

        this.http.post('/v2/businesses/' + this.storage.user.business_id + '/orders', orderObject).toPromise().then(res => {
            this.placingOrder = false;
            if (res.code === 200) {
                this.orderService.OrderDetails = res;
                this.router.navigate(['/', 'dashboard', 'quick-purchase', 'payment']).catch(err => {
                    console.log(err);
                });
            } else {
                this.dialog.open(ConfirmationModalComponent, {
                    data: {
                        type: 'failure',
                        title: 'Order Place Failed!',
                        text: res.message,
                        actionText: 'Please Try Again'
                    },
                    minWidth: '570px',
                    minHeight: '540px',
                    panelClass: 'dialog-confirmation'
                }).afterClosed().subscribe(res => {
                });
            }
        }).catch(err => {
            this.placingOrder = false;
            console.log(err);
        });
    }

    getMonthDateWithMonth(date) {
        const d = new Date(date);

        const month = this.monthNames[d.getMonth()];

        return d.getDate() + ' ' + month + ', ' + this.weekdays[d.getDay()];
    }

    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    applyPromo() {
        this.applyingPromo = true;
        const promoObject = {
            ...this.orderService.OrderPlaceObject,
            code: this.promoKey
        };
        this.http.post('/v2/businesses/' + this.storage.user.business_id + '/promotions/add', promoObject).toPromise().then(res => {
            console.log(res);
            this.applyingPromo = false;

            let modalData = {};

            if (res.code === 200) {
                this.orderService.Voucher = res.promotion;
                modalData = {
                    type: 'success',
                    title: 'Request Success!',
                    text: 'Promo applied successfully',
                    actionText: 'Close'
                };
            } else {
                modalData = {
                    type: 'failure',
                    title: 'Request Failed!',
                    text: res.message,
                    actionText: 'Please Try Again'
                };
            }

            this.dialog.open(ConfirmationModalComponent, {
                data: modalData,
                minWidth: '570px',
                minHeight: '540px',
                panelClass: 'dialog-confirmation'
            }).afterClosed().subscribe(res => {
            });
        }).catch(err => {
            this.applyingPromo = false;
        });
    }

    calculateDiscount() {
        if (this.orderService.Partner.discount > 0) {
            return Math.round(this.orderService.Partner.discount);
        } else {
            return this.orderService.Voucher ? Math.round(this.orderService.Voucher.amount) : 0;
        }
    }

    getTotalPrice() {
        return this.orderService.Voucher ? Math.round(this.orderService.Partner.discounted_price - this.orderService.Voucher.amount) : Math.round(this.orderService.Partner.discounted_price);
    }

    getApiFormat(date) {
    }

    fireAmplitudeEvent() {
        this.amplitude.fireCustomEvent(this.amplitude.events.quick_purchase_order, {
            business_id: this.storage.user.business_id,
            name: this.storage.user.name,
            service_id: this.orderService.Services && this.orderService.Services.length ?
                this.orderService.Services[0].id : null,
            service_name: this.orderService.Services && this.orderService.Services.length ?
                this.orderService.Services[0].name : null,
            SP_name: this.orderService.Partner.name,
            time: this.orderService.Time.value,
            purchase_value: this.getTotalPrice()
        });
    }

}
