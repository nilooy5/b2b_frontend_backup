import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderService} from '../../../../services/order-service/order.service';
import {MatDialog} from '@angular/material';
import {ServiceOptionsComponent} from './service-options/service-options.component';
import {ServiceDetailsModalComponent} from '../../../modals/service-details-modal/service-details-modal.component';
import {PopAlertService} from '../../../../modules/pop-alert/pop-alert.service';
import {AmplitudeService} from '../../../../services/amplitude.service';
import {StorageService} from '../../../../services/storage.service';

declare var $: any;

@Component({
    selector: 'app-service-list',
    templateUrl: './service-list.component.html',
    styleUrls: ['./service-list.component.scss']
})

export class ServiceListComponent implements OnInit {
    services: any[];
    selectedServices: any[] = [];
    showCart = false;
    selectedService: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        public orderService: OrderService,
        private dialog: MatDialog,
        private amplitude: AmplitudeService,
        private storage: StorageService
    ) {
        this.setData();
        this.selectedServices = this.orderService.Services || [];
    }


    ngOnInit() { }

    setData() {
        this.route.data.subscribe(res => {
            this.services = res.services as any[];
            this.services.forEach(element => { element.quantity = element.min_quantity; });
        });
    }

    addService(service) {
        if (service.variable_type === 'Options') {
            this.router.navigateByUrl('/dashboard/quick-purchase/option').then(r => {
                this.orderService.ServiceDetails = service;
            });
        } else {
            this.fireAmplitudeEvent(service);
            const minQuantity = service.min_quantity;

            const serviceInfo = {
                id: service.id,
                name: service.name,
                quantity: service.min_quantity,
                options: [],
                thumb: service.thumb,
                min_quantity: service.min_quantity,
                variable_type: service.variable_type,
                category_id: service.category_id,
                unit: service.unit,
                questions: service.questions
            };

            this.checkDuplicateService(serviceInfo, minQuantity);
        }
    }

    checkDuplicateService(selectedServiceOptions, minimumQuantity) {
        const serviceOption = this.selectedServices.find((service) => {
            return service.id === selectedServiceOptions.id;
        });

        serviceOption ? serviceOption.quantity += minimumQuantity : this.selectedServices.push(selectedServiceOptions);
        this.orderService.Services = this.selectedServices;
        this.goToCart();
    }

    goToCart() {
        this.router.navigate(['/', 'dashboard', 'quick-purchase', 'cart']).then();
    }

    removeService(item) {
        const serviceIndex = this.orderService.Services.findIndex(s => s.id == item.id && JSON.stringify(s.options) == JSON.stringify(item.options));
        this.orderService.Services.splice(serviceIndex, 1);
    }

    updateServiceQuantity(item, op) {
        const serviceIndex = this.orderService.Services.findIndex(s => s.id == item.id && JSON.stringify(s.options) == JSON.stringify(item.options));

        if (op === 'increase') {
            this.orderService.Services[serviceIndex].quantity++;
            this.services[serviceIndex].quantity++;
        } else {
            if (this.orderService.Services[serviceIndex].quantity > this.orderService.Services[serviceIndex].min_quantity) {
                this.orderService.Services[serviceIndex].quantity--;
                this.services[serviceIndex].quantity--;
            }
        }

        this.orderService.Services = this.orderService.Services;
    }

    viewDetails(e) {
        this.dialog.open(ServiceDetailsModalComponent, {
            data: {
                description: e.description,
                banner: e.banner
            },
            width: '570px',
            height: '520px',
            panelClass: 'dialog-general'
        });
    }

    fireAmplitudeEvent({id, name}) {
        this.amplitude.fireCustomEvent(this.amplitude.events.quick_purchase_service, {
            business_id: this.storage.user.business_id,
            name: this.storage.user.name,
            service_id: id,
            service_name: name
        });
    }

}
