import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-vehicle-details',
    templateUrl: './vehicle-details.component.html',
    styleUrls: ['./vehicle-details.component.scss']
})
export class VehicleDetailsComponent implements OnInit {
    vehicleData: any;

    constructor(
        private route: ActivatedRoute,
    ) {
        this.route.data.subscribe(res => {
            this.setData(res);
        });
    }

    ngOnInit() {
    }

    setData(data: any) {
        this.vehicleData = data.info;
    }

}
