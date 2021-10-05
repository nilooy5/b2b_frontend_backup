import { Component, OnInit, Input } from '@angular/core';
import {Partner} from '../../../../../types/users';
import {OrderService} from '../../../../../services/order-service/order.service';
import {environment} from '../../../../../../environments/environment';
import {PopAlertService} from '../../../../../modules/pop-alert/pop-alert.service';
import {AmplitudeService} from '../../../../../services/amplitude.service';
import {StorageService} from '../../../../../services/storage.service';

@Component({
    selector: 'app-partner-list-item',
    templateUrl: './partner-list-item.component.html',
    styleUrls: ['./partner-list-item.component.scss']
})
export class PartnerListItemComponent implements OnInit {

    // @Input() partner: Partner;
    @Input() partner: any;
    @Input() storageService: any;

    constructor(
        private amplitude: AmplitudeService,
        private storage: StorageService
    ) { }

    ngOnInit() {
    }

    selectPartner(partner) {
        this.fireAmplitudeEvent(partner);
        this.storageService.Partner = partner;
    }

    checkIfSelected() {
        const partnerId = this.partner.id;
        return this.storageService.Partner ? this.storageService.Partner.id === partnerId : false;
    }

    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    generateSpShopUrl(sub_domain) {
        return environment.customer_web_url + 'partners/' + sub_domain;
    }

    fireAmplitudeEvent({name}) {
        this.amplitude.fireCustomEvent(this.amplitude.events.quick_purchase_partner, {
            business_id: this.storage.user.business_id,
            name: this.storage.user.name,
            service_id: this.storageService.Services && this.storageService.Services.length ?
                this.storageService.Services[0].id : null,
            service_name: this.storageService.Services && this.storageService.Services.length ?
                this.storageService.Services[0].name : null,
            SP_name: name
        });
    }
}
