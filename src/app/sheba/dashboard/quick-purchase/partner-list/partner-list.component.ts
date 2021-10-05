import { Component, OnInit } from '@angular/core';
import {Partner} from '../../../../types/users';
import {ActivatedRoute} from '@angular/router';
import {OrderService} from '../../../../services/order-service/order.service';
import {environment} from '../../../../../environments/environment';
import {StorageService} from '../../../../services/storage.service';

@Component({
    selector: 'app-partner-list',
    templateUrl: './partner-list.component.html',
    styleUrls: ['./partner-list.component.scss']
})
export class PartnerListComponent implements OnInit {

    partners: Array<Partner> = [];

    constructor(
        private route: ActivatedRoute,
        public orderService: OrderService,
        private storage: StorageService
    ) {
        this.setData();
    }

    ngOnInit() {
    }

    setData() {
        this.route.data.subscribe(res => {
            this.partners = res.partners as any[];
            if (this.orderService.Partner) {
                this.orderService.Partner = this.partners.find(p => p.id === this.orderService.Partner.id);
            }
        });
    }

}
