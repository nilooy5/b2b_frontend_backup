import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-vehicle-summary-card',
    templateUrl: './vehicle-summary-card.component.html',
    styleUrls: ['./vehicle-summary-card.component.scss']
})
export class VehicleSummaryCardComponent implements OnInit {

    @Input() vehicleInfo: any;

    constructor() { }

    ngOnInit() {
    }

}
