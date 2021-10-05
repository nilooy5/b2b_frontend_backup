import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatTableDataSource} from '@angular/material';
import {ShebaHttpService} from '../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../services/storage.service';


@Component({
  selector: 'app-purchase-request-list',
  templateUrl: './purchase-request-list.component.html',
  styleUrls: ['./purchase-request-list.component.scss']
})
export class PurchaseRequestListComponent implements OnInit {

    purchaseRequests: any[] = [];
    search: string;
    dataSource: MatTableDataSource<any>;
    displayColumns = ['id', 'employee_name', 'title', 'estimated_price', 'required_date', 'status', 'actions'];
    departments: any[] = [];
    status = {
        pending: 'warning',
        approved: 'success',
        need_approval: 'primary',
        rejected: 'danger'
    };

    constructor(
        private route: ActivatedRoute,
        private http: ShebaHttpService,
        private storage: StorageService
    ) {
        this.route.data.subscribe(res => {
            this.setData(res.purchaseRequests);
            this.departments = res.departments;
        });
    }

    ngOnInit() {
    }

    getStatus(key) {
        return 'badge badge-' + this.status[key];
    }

    setData(data) {
        this.purchaseRequests = data as any[];
        this.dataSource = new MatTableDataSource(this.purchaseRequests);
    }

    filterPurchaseRequests(filter) {
        const filterParams = {
            limit: '10',
            offset: filter.page.toString()
        };
        if (filter.status) {
            filterParams['status'] = filter.status;
        }
        if (filter.start_date && filter.end_date) {
            filterParams['start_date'] = filter.start_date;
            filterParams['end_date'] = filter.end_date;
        }
        this.getFilteredPurchaseRequests(filterParams);
    }

    searchPurchaseRequests(key) {
        let result = [];

        result = this.purchaseRequests.filter(pr => pr.title ? pr.title.toLowerCase().includes(key.toLowerCase()) : false);

        this.dataSource = new MatTableDataSource(result);
    }

    getFilteredPurchaseRequests(filters) {
        this.http.get('/v2/businesses/' + this.storage.user.business_id + '/purchase-requests',
            {
                params: filters,
                responseType: 'text'
            }
        ).toPromise().then(res => {
            this.setData(JSON.parse(res).data || []);
        });
    }

    sortPurchaseRequests(sort) {
        if (sort) {
            this.purchaseRequests = this.purchaseRequests.reverse();
            this.dataSource = new MatTableDataSource(this.purchaseRequests);
        }
    }
}
