import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {TenderService} from '../../../../services/tender-service/tender.service';
import {OrderService} from '../../../../services/order-service/order.service';

@Component({
    selector: 'app-additional-information',
    templateUrl: './additional-information.component.html',
    styleUrls: ['./additional-information.component.scss']
})
export class AdditionalInformationComponent implements OnInit {

    storedAdditionalInformation: any;
    additionalInformation = new FormControl();

    constructor(private orderService: OrderService) {
        this.storedAdditionalInformation = this.orderService.AdditionalInformation ? this.orderService.AdditionalInformation : '';
        this.additionalInformation.setValue(this.storedAdditionalInformation);
    }

    ngOnInit() {
        this.additionalInformation.valueChanges.subscribe(res => {
            this.orderService.AdditionalInformation = res;
        });
    }

}
