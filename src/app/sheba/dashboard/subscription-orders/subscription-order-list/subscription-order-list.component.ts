import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatTableDataSource} from '@angular/material';
import {ShebaHttpService} from '../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../services/storage.service';

@Component({
    selector: 'app-subscription-order-list',
    templateUrl: './subscription-order-list.component.html',
    styleUrls: ['./subscription-order-list.component.scss']
})
export class SubscriptionOrderListComponent implements OnInit {
    public subscriptionOrders: any;
    public filteredSubscriptionOrders: any;
    totalSubscriptionOrdersCount: number;
    dataSource: MatTableDataSource<any>;
    displayColumns = ['service_name', 'partner_name', 'subscription_period', 'completed_orders', 'status', 'actions'];
    subscriptionOrderStatuses: any = [
        {
            key: 'requested',
            title: 'Requested'
        },
        {
            key: 'converted',
            title: 'Converted'
        },
        {
            key: 'paid',
            title: 'Paid'
        },
        {
            key: 'completed',
            title: 'Completed'
        }
    ];

    constructor(private route: ActivatedRoute, private http: ShebaHttpService, private storage: StorageService) {
        this.route.data.subscribe(res => {
            this.setData(res);
        });
    }

    ngOnInit() {
    }

    setData(data) {
        if (data.subscriptionOrderLists.subscription_orders && data.subscriptionOrderLists.subscription_orders.length) {
            this.subscriptionOrders = data.subscriptionOrderLists.subscription_orders;
        }
        this.totalSubscriptionOrdersCount = data.subscriptionOrderLists.subscription_orders_count;
        this.filteredSubscriptionOrders = this.subscriptionOrders;
        this.dataSource = new MatTableDataSource(this.filteredSubscriptionOrders);
    }

    setFilteredSubscriptionOrders(filter) {
        const filterParams = {
            limit: '10',
            offset: filter.page.toString()
        };
        if (filter.status) {
            filterParams['status'] = filter.status;
        }

        this.getFilteredSubscriptionOrders(filterParams);
    }

    getFilteredSubscriptionOrders(filters) {
        this.http.get('v2/businesses/' + this.storage.user.business_id + '/subscription-orders',
            {
                params: filters,
                responseType: 'text'
            }
        ).toPromise().then(res => {
            this.setData({subscriptionOrderLists: JSON.parse(res) || []});
        });
    }

    handleSearch(key) {
        this.filteredSubscriptionOrders = this.subscriptionOrders.filter(item => item.service_name.toLowerCase().includes(key.toLowerCase()));
        this.dataSource = new MatTableDataSource(this.filteredSubscriptionOrders);
    }

    handleAlphabeticSort(key) {
        key = parseInt(key, 10);
        if (key === 0) {
            this.filteredSubscriptionOrders = this.subscriptionOrders;
            this.dataSource = new MatTableDataSource(this.filteredSubscriptionOrders);
        } else {
            this.filteredSubscriptionOrders = this.filteredSubscriptionOrders.sort((a, b) => {
                if (key === 1) {
                    return a.service_name.toLowerCase() < b.service_name.toLowerCase() ? -1 : 1;
                } else if (key === 2) {
                    return a.service_name.toLowerCase() > b.service_name.toLowerCase() ? -1 : 1;
                }
            });
            this.dataSource = new MatTableDataSource(this.filteredSubscriptionOrders);
        }
    }


}
