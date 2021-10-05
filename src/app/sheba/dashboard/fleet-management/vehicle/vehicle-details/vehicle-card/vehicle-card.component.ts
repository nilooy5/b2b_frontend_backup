import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-vehicle-card',
    templateUrl: './vehicle-card.component.html',
    styleUrls: ['./vehicle-card.component.scss']
})
export class VehicleCardComponent implements OnInit {

    @Input() vehicleData: any;

    constructor() { }

    ngOnInit() {
    }

}
