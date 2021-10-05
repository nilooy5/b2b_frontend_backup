import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { ShebaHttpService } from '../../../../../modules/sheba-http/sheba-http.service';
import { StorageService } from '../../../../../services/storage.service';

@Component({
    selector: 'app-procurement-orders-list',
    templateUrl: './procurement-orders-list.component.html',
    styleUrls: ['./procurement-orders-list.component.scss']
})

export class ProcurementOrdersListComponent implements OnInit {

    displayedColumns = ['serviceName', 'serviceProvider', 'createdAt' , 'price', 'status', 'actions'];
    procurementOrdersList;
    filteredProcurementOrdersList;
    ordersListDataSource;
    totalOrdersCount;
    dataSource;

    rfqOrderStatus: any = [
        {
            key: 'all',
            title: 'All'
        },
        {
            key: 'accepted',
            title: 'Accepted'
        },
        {
            key: 'started',
            title: 'Started'
        },
        {
            key: 'served',
            title: 'Served'
        },
        {
            key: 'cancelled',
            title: 'Cancelled'
        }
    ];

    constructor(private router: Router,
                private storage: StorageService,
                private route: ActivatedRoute,
                private http: ShebaHttpService) {
        this.route.data.subscribe(res => {
            this.setOrdersList(res);
        });
    }

    ngOnInit() { }

    setOrdersList(orderList) {
        if (orderList.procurementOrdersList.rfq_order_lists && orderList.procurementOrdersList.rfq_order_lists.length) {
            this.procurementOrdersList = orderList.procurementOrdersList.rfq_order_lists;
        } else {
            this.procurementOrdersList = [];
        }
        this.totalOrdersCount = orderList.procurementOrdersList.total_procurement;
        this.filteredProcurementOrdersList = this.procurementOrdersList;
        this.dataSource = new MatTableDataSource(this.filteredProcurementOrdersList);
    }

    redirectToProcurementOrder(element) {
        this.router.navigate(['/', 'dashboard', 'procurement', 'orders', element.procurement_id], {queryParams: {bid: element.bid_id}}).then();
    }

    handleAlphabeticSort(key) {
        this.filteredProcurementOrdersList = this.procurementOrdersList.sort((a, b) => {
            if (key === 'ascending') {
                return a.procurement_title.toLowerCase() < b.procurement_title.toLowerCase() ? -1 : 1;
            }
            if (key === 'descending') {
                return a.procurement_title.toLowerCase() > b.procurement_title.toLowerCase() ? -1 : 1;
            }
        });

        this.dataSource = new MatTableDataSource(this.filteredProcurementOrdersList);
    }

    handleSearch(key) {
        this.filteredProcurementOrdersList = this.procurementOrdersList.filter(item => {
            return  item.procurement_title.toLowerCase().includes(key.toLowerCase()) ||
                    item.vendor.name.toLowerCase().includes(key.toLowerCase());
        });
        this.dataSource = new MatTableDataSource(this.filteredProcurementOrdersList);
    }

    setFilteredSubscriptionOrders(filter) {
        const filterParams = {
            limit: '10',
            offset: filter.page.toString()
        };
        if (filter.start_date && filter.end_date) {
            filterParams['start_date'] = filter.start_date;
            filterParams['end_date'] = filter.end_date;
        }
        if (filter.status) {
            filterParams['status'] = filter.status;
        }
        this.getFilteredProcurements(filterParams);
    }

    getFilteredProcurements(filters) {
        this.http.get('v2/businesses/' + this.storage.user.business_id + '/procurements/orders',
            {
                params: filters,
                responseType: 'text'
            }).toPromise().then(res => this.setOrdersList({procurementOrdersList: JSON.parse(res) || []}));
    }
}
