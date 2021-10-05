import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { OrderService } from '../../../../services/order-service/order.service';
import { QuickPurchaseValidationService } from '../quick-purchase-validation.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AmplitudeService } from '../../../../services/amplitude.service';
import { StorageService } from '../../../../services/storage.service';
import {PopAlertService} from '../../../../modules/pop-alert/pop-alert.service';

@Component({
    selector: 'app-option',
    templateUrl: './option.component.html',
    styleUrls: ['./option.component.scss']
})

export class OptionComponent implements OnInit {

    storedServiceDetails: any;
    serviceDetails: any;
    serviceOptions: any;
    serviceOptionsForm: FormGroup;
    quantity = 1;
    minimumQuantity: number;
    tmp = false;
    selectedServices: any[] = [];
    quantityUnit: string;


    constructor(private formBuilder: FormBuilder,
                private router: Router,
                private amplitude: AmplitudeService,
                private quickPurchaseValidationService: QuickPurchaseValidationService,
                private storage: StorageService,
                private pop: PopAlertService,
                private orderService: OrderService) {

        this.selectedServices = this.orderService.Services || [];

        this.quickPurchaseValidationService.notifySelectedServiceSubmit.pipe(take(1)).subscribe((res) => {
            if (res) {
                this.submitSelectedService();
            }
        });

    }

    ngOnInit() {

        this.storedServiceDetails = this.orderService.ServiceDetails ? this.orderService.ServiceDetails : '';
        this.quantityUnit = this.orderService.ServiceDetails.unit ? this.orderService.ServiceDetails.unit : 'unit';
        this.serviceDetails = this.storedServiceDetails;
        this.serviceOptions = this.storedServiceDetails.questions;
        this.serviceForm();
        this.quantity = this.serviceDetails.min_quantity;
        this.minimumQuantity = this.serviceDetails.min_quantity;
        // this.storedServiceOptions.setValue(this.storedServiceOptions);

    }

    serviceForm() {
        this.serviceOptionsForm = this.formBuilder.group({});
        if (this.serviceOptions.length === 1) {
            this.serviceOptions.forEach((option, index) => {
                this.serviceOptionsForm.addControl(index + '', new FormControl(0));
            });
        } else {
            this.serviceOptions.forEach((option, index) => {
                this.serviceOptionsForm.addControl(index + '', new FormControl(0));
            });
        }
    }

    updateQuantity(op) {
        if (op === 'increase') {
            this.quantity++;
        }
        if (op === 'decrease' && this.quantity > this.minimumQuantity) {
            this.quantity--;
        }
    }

    submitSelectedService() {
        const options = [];
        const data = this.serviceOptionsForm.getRawValue();
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                options.push(data[key]);
            }
        }
        this.fireAmplitudeEvent(this.serviceDetails);

        const serviceInfo = {
            id: this.serviceDetails.id,
            name: this.serviceDetails.name,
            quantity: this.quantity,
            options,
            thumb: this.serviceDetails.thumb,
            min_quantity: this.serviceDetails.min_quantity,
            variable_type: this.serviceDetails.variable_type,
            category_id: this.serviceDetails.category_id,
            unit: this.serviceDetails.unit,
            questions: this.serviceDetails.questions
        };
        this.checkDuplicateServiceOption(serviceInfo);
    }

    checkDuplicateServiceOption(serviceInfo) {
        const selectedService = this.selectedServices.find((service) => {
            return service.id === serviceInfo.id && JSON.stringify(service.options) === JSON.stringify(serviceInfo.options);
        });

        selectedService ? selectedService.quantity += this.quantity : this.selectedServices.push(serviceInfo);

        this.orderService.Services = this.selectedServices;
        this.goToCart();
    }

    goToCart() {
        this.router.navigate(['/', 'dashboard', 'quick-purchase', 'cart']).then();
    }

    fireAmplitudeEvent({id, name}) {
        this.amplitude.fireCustomEvent(this.amplitude.events.quick_purchase_service, {
            business_id: this.storage.user.business_id,
            name: this.storage.user.name,
            service_id: id,
            service_name: name
        });
    }

    onChangeQuantity(event: any) {
        this.quantity = parseInt(event.target.value);
    }

    onBlur(event: any) {
        if (event.target.value === '') {
            this.pop.open('Quantity can not be empty');
            this.quantity = 1;
        }
        if (event.target.value === '0') {
            this.pop.open('Can not be less than minimum quantity');
            this.quantity = 1;
        }
    }
}


