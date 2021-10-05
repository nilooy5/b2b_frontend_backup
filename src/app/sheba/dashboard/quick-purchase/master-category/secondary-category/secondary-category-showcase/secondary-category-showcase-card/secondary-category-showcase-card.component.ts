import { Component, Input, OnInit } from '@angular/core';
import {OrderService} from '../../../../../../../services/order-service/order.service';
import {Router} from '@angular/router';
import {PopAlertService} from '../../../../../../../modules/pop-alert/pop-alert.service';
import {AmplitudeService} from '../../../../../../../services/amplitude.service';
import {StorageService} from '../../../../../../../services/storage.service';

@Component({
    selector: 'app-secondary-category-showcase-card',
    templateUrl: './secondary-category-showcase-card.component.html',
    styleUrls: ['./secondary-category-showcase-card.component.scss']
})
export class SecondaryCategoryShowcaseCardComponent implements OnInit {

    @Input() secondaryCategory: any;

    constructor(
        public orderService: OrderService,
        private router: Router,
        private pop: PopAlertService,
        private amplitude: AmplitudeService,
        private storage: StorageService
    ) { }

    ngOnInit() { }

    selectSecondaryCategory() {
        this.orderService.SubCategory = this.secondaryCategory;
        this.fireAmplitudeEvent(this.secondaryCategory);
        this.router.navigate(['/', 'dashboard', 'quick-purchase', 'select-service']).catch(err => {
            this.pop.open('Not Found.');
        });
    }

    fireAmplitudeEvent({id, name}) {
        this.amplitude.fireCustomEvent(this.amplitude.events.quick_purchase_category, {
            business_id: this.storage.user.business_id,
            name: this.storage.user.name,
            master_category_id: id,
            master_category_name: name
        });
    }

}
