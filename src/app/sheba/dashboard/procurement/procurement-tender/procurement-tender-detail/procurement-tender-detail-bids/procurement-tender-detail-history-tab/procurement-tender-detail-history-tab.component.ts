import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-procurement-tender-detail-history-tab',
    templateUrl: './procurement-tender-detail-history-tab.component.html',
    styleUrls: ['./procurement-tender-detail-history-tab.component.scss'],
    encapsulation: ViewEncapsulation.Emulated
})
export class ProcurementTenderDetailHistoryTabComponent implements OnInit {

    procurementId;
    procurementBidHistory: any;
    bidHistoryDataSource: any;
    displayColumns = ['serviceProvider', 'date', 'price', 'status', 'actions'];

    constructor(private route: ActivatedRoute) {

        this.route.parent.parent.params.subscribe(value => this.procurementId = value.procurement_id);

        this.route.data.subscribe(res => {
            console.log(res.bidHistory.bid_histories);
            this.procurementBidHistory = res.bidHistory.bid_histories;
        });
    }

    ngOnInit() {
        if (this.procurementBidHistory) {
            this.bidHistoryDataSource = this.procurementBidHistory.map(item => {
                return {
                    id: item.id,
                    serviceProvider: item.service_provider,
                    date: item.created_at,
                    price: item.price,
                    status: item.status,
                    color: item.color,
                    itemName: item.title
                };
            });
        }
    }

}
