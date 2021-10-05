import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-rfq-orders-details-description',
    templateUrl: './rfq-orders-details-description.component.html',
    styleUrls: ['./rfq-orders-details-description.component.scss']
})
export class RfqOrdersDetailsDescriptionComponent implements OnInit {

    @Input() order;

    constructor() {
    }

    ngOnInit() {
    }

}
