import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ShebaHttpService} from '../../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../../services/storage.service';
import {MatTableDataSource} from '@angular/material';
import {log} from 'util';

@Component({
  selector: 'app-subscription-order-tab',
  templateUrl: './subscription-order-tab.component.html',
  styleUrls: ['./subscription-order-tab.component.scss'],
    encapsulation: ViewEncapsulation.None

})
export class SubscriptionOrderTabComponent implements OnInit {

    @Input() orderList;
    totalOrdersCount: number;
    orders: any[] = [];
    dataSource: MatTableDataSource<any>;
    displayColumns = ['service_name', 'order_id', 'date', 'time', 'status', 'actions'];


    constructor() {
    }

    ngOnInit() {
        this.dataSource = new MatTableDataSource(this.orderList);
    }
}
