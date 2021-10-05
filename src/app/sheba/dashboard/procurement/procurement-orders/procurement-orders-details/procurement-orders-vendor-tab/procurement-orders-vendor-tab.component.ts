import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-procurement-orders-vendor-tab',
    templateUrl: './procurement-orders-vendor-tab.component.html',
    styleUrls: ['./procurement-orders-vendor-tab.component.scss']
})

export class ProcurementOrdersVendorTabComponent implements OnInit {

    vendorDetails: any;

    constructor(private route: ActivatedRoute) {
        this.route.data.subscribe(res => this.vendorDetails = res.vendorInformation);
    }

    ngOnInit() {
    }

}
