import {Component, Input, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

@Component({
    selector: 'app-rfq-orders-details-quotation',
    templateUrl: './rfq-orders-details-quotation.component.html',
    styleUrls: ['./rfq-orders-details-quotation.component.scss']
})
export class RfqOrdersDetailsQuotationComponent implements OnInit {

    @Input() order;
    dataSource;
    displayedColumns = ['serialNo', 'itemName', 'specification', 'unit'];

    constructor() {
    }

    ngOnInit() {
        this.setTableDataSource(this.order.bid_price_quotations);
    }

    setTableDataSource(items) {
        this.dataSource = new MatTableDataSource(items);
    }

}
