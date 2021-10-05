import {Component, Input, OnInit} from '@angular/core';
import {OrderService} from '../../../../../../../services/order-service/order.service';
import {PopAlertService} from '../../../../../../../modules/pop-alert/pop-alert.service';
import {Router} from '@angular/router';
import {AmplitudeService} from '../../../../../../../services/amplitude.service';
import {StorageService} from '../../../../../../../services/storage.service';

@Component({
    selector: 'app-secondary-category-list-card',
    templateUrl: './secondary-category-list-card.component.html',
    styleUrls: ['./secondary-category-list-card.component.scss']
})
export class SecondaryCategoryListCardComponent implements OnInit {

    @Input() masterCategory: any;

    constructor(
        private orderService: OrderService,
        private router: Router,
        private pop: PopAlertService,
        private amplitude: AmplitudeService,
        private storage: StorageService
    ) { }

    ngOnInit() {
    }

    selectSecondaryCategory(secondaryCategories) {
        this.orderService.SubCategory = secondaryCategories;
        this.fireAmplitudeEvent(secondaryCategories);
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
