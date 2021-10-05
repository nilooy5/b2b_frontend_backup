import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Vendor} from "../../../../types/vendors";

@Component({
    selector: 'app-vendor-details',
    templateUrl: './vendor-details.component.html',
    styleUrls: ['./vendor-details.component.scss']
})
export class VendorDetailsComponent implements OnInit {
    vendor:Vendor;
    constructor(
        private route: ActivatedRoute
    ) {
        this.route.data.subscribe(res=>{
            this.vendor=res.vendor
        })
    }

    ngOnInit() {
    }

}
