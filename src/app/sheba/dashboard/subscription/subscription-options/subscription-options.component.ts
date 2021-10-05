import { Component, OnInit } from '@angular/core';
import { Service } from '../../../../models/service';
import { cartesianProduct, getTrueValueIndices } from '../../../../helpers/functions';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SubscriptionService } from '../../../../services/subscription-service/subscription.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SubscriptionValidationService} from '../subscription-validation.service';

@Component({
    selector: 'app-subscription-options',
    templateUrl: './subscription-options.component.html',
    styleUrls: ['./subscription-options.component.scss']
})
export class SubscriptionOptionsComponent implements OnInit {

    service: Service;
    quantity: number;
    form: FormGroup;
    selectedServices: Array<any>;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private subscriptionService: SubscriptionService,
        private subscriptionValidationService: SubscriptionValidationService,
        fb: FormBuilder
    ) {
        this.route.data.subscribe(res => {
            this.service = res.service as Service;
            this.selectedServices = this.subscriptionService.Services || [];
            const group = {};
            this.service.options.forEach((option, index) => {
                group[index] = option.isSelectBox() ? fb.array(option.answers.map((answer, answer_index) => {
                    return fb.control(answer_index === 0);
                })) : fb.control(0);
            });
            this.form = fb.group(group);
        });
        this.subscriptionValidationService.notifySubscriptionSubmit.subscribe(res => {
            if (res) {
                this.add();
            }
        });
    }

    ngOnInit() {
        this.quantity = this.service.min_quantity;
    }

    add() {
        if (this.service.isOptions()) {
            const options = this.form.getRawValue();
            let all_selections = [];
            this.service.options.forEach((service_option, index) => {
                const option = options[index];
                const selected_values = service_option.isSelectBox() ? getTrueValueIndices(option) : [option];
                all_selections = cartesianProduct(all_selections, selected_values);
            });
            all_selections.forEach(selected_option => {
                this.pushServiceToSelectedServices(selected_option);
            });
        } else {
            this.pushServiceToSelectedServices([]);
        }
        this.subscriptionService.Services = this.selectedServices;
    }

    increaseQuantity() {
        this.quantity++;
    }

    decreaseQuantity() {
        if (this.quantity > this.service.min_quantity) {
            this.quantity--;
        }
    }

    pushServiceToSelectedServices(selected_option) {

        const serviceInfo = {
            id: this.service.id,
            option: selected_option,
            quantity: this.quantity,
            name: this.service.name,
            questions: this.service.options,
            thumb: this.service.thumb,
            unit: this.service.unit
        };

        this.checkDuplicateService(serviceInfo);

    }

    checkDuplicateService(serviceInfo) {

        const selectedServiceOption = this.selectedServices.find(s => {
            return s.id === serviceInfo.id && JSON.stringify(s.option) === JSON.stringify(serviceInfo.option);
        });

        selectedServiceOption ? selectedServiceOption.quantity += this.quantity : this.selectedServices.push(serviceInfo);

        this.goToCart();

    }

    increaseServiceQuantity(index) {
        this.selectedServices[index].quantity++;
        this.subscriptionService.Services = this.selectedServices;
    }

    decreaseServiceQuantity(index) {
        if (this.selectedServices[index].quantity > this.service.min_quantity) {
            this.selectedServices[index].quantity--;
            this.subscriptionService.Services = this.selectedServices;
        }
    }

    removeService(index) {
        this.selectedServices.splice(index, 1);
        this.subscriptionService.Services = this.selectedServices;
    }

    goToCart() {
        this.router.navigate(['/', 'dashboard', 'order', 'subscription', 'cart']).catch(err => {
            console.log(err);
        });
    }

}
