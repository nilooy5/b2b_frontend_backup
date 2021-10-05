import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-vendor-details-spoc-info',
    templateUrl: './vendor-details-spoc-info.component.html',
    styleUrls: ['./vendor-details-spoc-info.component.scss']
})
export class VendorDetailsSpocInfoComponent implements OnInit {

    public info: any = null;

    constructor(
        private route: ActivatedRoute
    ) {
        this.route.data.subscribe(res => {
            this.info = res.info;
        });
    }

    ngOnInit() {
    }

    limitString(str) {
        return (str && str.length > 22) ? str.slice(0, 20) + '..' : str;
    }

}
