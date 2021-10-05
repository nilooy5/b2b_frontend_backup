import {Component, Input, OnInit} from '@angular/core';
import {NumericFormat} from '../../../../../../../helpers/numeric_format.service';

@Component({
    selector: 'app-rfq-orders-details-general-info',
    templateUrl: './rfq-orders-details-general-info.component.html',
    styleUrls: ['./rfq-orders-details-general-info.component.scss']
})
export class RfqOrdersDetailsGeneralInfoComponent implements OnInit {

    @Input() order;

    constructor(public numericFormat: NumericFormat) {
    }

    ngOnInit() {
    }

}
