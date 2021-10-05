import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {DashboardSharedService} from '../../../../../services/dashboard-shared.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {ShebaHttpService} from '../../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../../services/storage.service';

@Component({
    selector: 'app-rfq-orders-list',
    templateUrl: './rfq-orders-list.component.html',
    styleUrls: ['./rfq-orders-list.component.scss']
})
export class RfqOrdersListComponent implements OnDestroy, OnInit {

    static readonly ITEMS_PER_PAGE = 10;

    dataSource;
    tenderOrderList;
    filteredTenderOrderList;
    totalOrders: number;
    initialOrderCount: number;
    dataOffset = 1;
    currentLength = 0;

    tenderOrderStatuses: any = [
        {
            key: 'all',
            title: 'All'
        },
        {
            key: 'accepted',
            title: 'Accepted'
        },
        {
            key: 'process',
            title: 'Process'
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

    sort_tender_orders: any = [
        {sort_column: 'sort_by_id', sort_type: 'desc'},
        {sort_column: 'sort_by_title', sort_type: 'asc'},
        {sort_column: 'sort_by_vendor', sort_type: 'asc'},
        {sort_column: 'sort_by_created_at', sort_type: 'desc'},
        {sort_column: 'sort_by_status', sort_type: 'asc'},
    ];
    sortObj: { name: string, type: string };

    constructor(private dashboardSharedService: DashboardSharedService,
                private activatedRoute: ActivatedRoute,
                private http: ShebaHttpService,
                private storage: StorageService) {
        this.setDashboardHeader();
        this.activatedRoute.data.subscribe(res => {
            this.initialOrderCount = res.rfqOrdersList.total_orders;
            this.setTenderOrdersList(res.rfqOrdersList);
        });
    }

    setDashboardHeader() {
        this.dashboardSharedService.changeHeaderTitle('Tender Order List');
    }

    ngOnDestroy() {
        this.dashboardSharedService.changeHeaderTitle(null);
    }

    ngOnInit() {
    }

    setTenderOrdersList(orderList, offset = 0) {
        if (orderList.procurement_orders && orderList.procurement_orders.length) {
            this.tenderOrderList = orderList.procurement_orders;
            this.totalOrders = orderList.total_orders;
        } else {
            this.tenderOrderList = [];
            this.dataOffset = 0;
            this.totalOrders = 0;
        }
        this.currentLength = offset + this.tenderOrderList.length;
        this.filteredTenderOrderList = this.tenderOrderList;
        this.dataSource = new MatTableDataSource(this.filteredTenderOrderList);
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
        if (filter.search) {
            filterParams['search'] = filter.search;
        }
        if (filter.sort_column && filter.sort_type) {
            filterParams[filter.sort_column] = filter.sort_type;
        }
        this.getFilteredTenderOrders(filterParams);
    }

    handleAlphabeticSort(key) {
        this.filteredTenderOrderList = this.tenderOrderList.filter(item => {
            return item.title.toLowerCase().includes(key.toLowerCase()) ||
                item.bid.service_provider.name.toLowerCase().includes(key.toLowerCase());
        });
        this.dataSource = new MatTableDataSource(this.filteredTenderOrderList);
    }

    receiveSortByColumn($event) {
        this.sort_tender_orders.forEach((status) => {
            if (status.sort_column === $event) {
                this.sortObj = {
                    name: status.sort_column,
                    type: status.sort_type
                };
                status.sort_type === 'asc' ? status.sort_type = 'desc' : status.sort_type = 'asc';
            }
        });
    }

    getFilteredTenderOrders(filters) {
        const url = 'v2/businesses/' + this.storage.user.business_id + '/procurements/orders?';
        this.http.get(url,
            {
                params: filters,
                responseType: 'text'
            }).toPromise().then((res) => {
                if (JSON.parse(res).code !== 200) {
                    this.dataOffset = 0;
                    this.currentLength = 0;
                    this.setTenderOrdersList([]);
                }
                this.dataOffset = parseInt(filters.offset) + 1;
                this.setTenderOrdersList(JSON.parse(res), parseInt(filters.offset));
        });
    }

    getLimit() {
        return RfqOrdersListComponent.ITEMS_PER_PAGE;
    }
}
