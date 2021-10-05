import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {PopAlertService} from '../../../../../../modules/pop-alert/pop-alert.service';

@Component({
    selector: 'app-rfq-orders-list-table',
    templateUrl: './rfq-orders-list-table.component.html',
    styleUrls: ['./rfq-orders-list-table.component.scss']
})
export class RfqOrdersListTableComponent implements OnInit {

    displayedColumns = ['id', 'serviceName', 'serviceProvider', 'createdAt' , 'price', 'status', 'actions'];
    @Input() dataSource;
    @Input() filteredTenderOrderList;
    @Output() sortByColumnEmitter = new EventEmitter();

    constructor(private router: Router,
                public pop: PopAlertService) {
    }

    ngOnInit() {
    }

    redirectToTenderOrderDetails(element: any) {
        this.router.navigate(['/', 'dashboard', 'rfq', 'orders', element.id], {
            queryParams: {bidId: element.bid.id}
        }).catch(err => {
            this.pop.open(err);
        });
    }

    getStatusColor(status) {
        switch (status) {
            case 'Accepted': return 'orderStatus--accepted';
            case 'Process': return 'orderStatus--process';
            case 'Served': return 'orderStatus--served';
            case 'Cancelled': return 'orderStatus--cancelled';
        }
    }

    sortByColumn(column) {
        this.sortByColumnEmitter.emit(column);
    }
}
