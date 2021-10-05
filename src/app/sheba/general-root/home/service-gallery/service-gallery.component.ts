import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../environments/environment';

@Component({
    selector: 'app-service-gallery',
    templateUrl: './service-gallery.component.html',
    styleUrls: ['./service-gallery.component.scss']
})
export class ServiceGalleryComponent implements OnInit {

    officeCleaningImage = environment.s3_url + 'assets/landing/services/office-cleaning.jpg';
    tripsAndTravelImage = environment.s3_url + 'assets/landing/services/trips-and-travel.jpg';
    applianceRepairImage = environment.s3_url + 'assets/landing/services/appliance-repair.jpg';
    dailyLunchImage = environment.s3_url + 'assets/landing/services/daily-lunch.jpg';
    productImage = environment.s3_url + 'assets/landing/services/product.jpg';
    officeShiftingImage = environment.s3_url + 'assets/landing/services/office-shifting.jpg';

    constructor() { }

    ngOnInit() {
    }

}
