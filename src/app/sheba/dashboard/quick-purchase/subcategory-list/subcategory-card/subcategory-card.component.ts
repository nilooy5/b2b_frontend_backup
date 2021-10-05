import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderService} from '../../../../../services/order-service/order.service';
import {appConfig} from "../../../../../config/app.config";
import {PopAlertService} from '../../../../../modules/pop-alert/pop-alert.service';
import {AmplitudeService} from '../../../../../services/amplitude.service';
import {StorageService} from '../../../../../services/storage.service';

@Component({
    selector: 'app-subcategory-card',
    templateUrl: './subcategory-card.component.html',
    styleUrls: ['./subcategory-card.component.scss']
})
export class SubcategoryCardComponent implements OnInit {

    @Input() data: any;
    appConfig = appConfig;
    constructor(
        public orderService: OrderService,
        private router: Router,
        private pop: PopAlertService,
        private amplitude: AmplitudeService,
        private storage: StorageService
    ) {
    }

    ngOnInit() {
    }

    limitString(str) {
        return (str && str.length > 24) ? str.slice(0, 22) + '..' : str;
    }

    selectSubcategory() {
        this.orderService.SubCategory = this.data;
        this.fireAmplitudeEvent(this.data);
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
