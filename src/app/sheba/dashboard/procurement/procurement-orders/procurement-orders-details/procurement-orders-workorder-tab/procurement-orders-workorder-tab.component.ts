import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StorageService} from '../../../../../../services/storage.service';
import {ShebaHttpService} from '../../../../../../modules/sheba-http/sheba-http.service';
import {MatTableDataSource} from '@angular/material/table';
import {environment} from '../../../../../../../environments/environment';

@Component({
    selector: 'app-procurement-orders-workorder-tab',
    templateUrl: './procurement-orders-workorder-tab.component.html',
    styleUrls: ['./procurement-orders-workorder-tab.component.scss']
})
export class ProcurementOrdersWorkorderTabComponent implements OnInit {

    work_order: {
        from: any;
        grand_total: any;
        due: any;
        sub_total: any;
        terms: any;
        to: any;
        code: any;
    };
    dataSource: MatTableDataSource<any>;
    order_id: any;
    bid: any;

    displayedColumns = ['title', 'short_description', 'unit', 'unit_price', 'total_price'];

    constructor(private route: ActivatedRoute,
                private storage: StorageService,
                private http: ShebaHttpService,
                private router: Router) {
        this.order_id = this.route.snapshot.parent.parent.params.order_id;
        this.bid = this.route.snapshot.parent.parent.queryParams.bid;
        this.route.data.subscribe(({procurementWorkorderDetailsResolver}) => {
            const {work_order} = procurementWorkorderDetailsResolver;
            this.work_order = work_order;
            this.dataSource = new MatTableDataSource(work_order.items);
        });
    }

    ngOnInit() {
    }

    downloadWorkorder() {
        window.location.href = environment.api_url + '/v2/businesses/' + this.storage.user.business_id + '/procurements/' + this.order_id + '/bids/' + this.bid + '/work-order/download?token=' + this.storage.user.token;
    }
    /*printWindow() {
        window.print();
    }*/

}
