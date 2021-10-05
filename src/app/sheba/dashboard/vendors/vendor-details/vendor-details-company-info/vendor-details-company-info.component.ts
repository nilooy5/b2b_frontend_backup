import {Component, OnInit} from '@angular/core';
import {Vendor} from "../../../../../types/vendors";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-vendor-details-company-info',
    templateUrl: './vendor-details-company-info.component.html',
    styleUrls: ['./vendor-details-company-info.component.scss']
})
export class VendorDetailsCompanyInfoComponent implements OnInit {
    vendor: Vendor;

    constructor(
        private route: ActivatedRoute
    ) {
        this.route.parent.parent.data.subscribe(res => {
            this.vendor = res.vendor;
        });
    }

    ngOnInit() {
    }

    limitString(str) {
        return (str && str.length > 22) ? str.slice(0, 20) + '..' : str;
    }
}
