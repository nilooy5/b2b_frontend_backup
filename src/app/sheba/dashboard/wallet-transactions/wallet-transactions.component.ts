import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ShebaHttpService} from '../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../services/storage.service';
import {MatTableDataSource} from '@angular/material';
import {catchError, map} from 'rxjs/operators';
import {of} from 'rxjs';

@Component({
    selector: 'app-wallet-transactions',
    templateUrl: './wallet-transactions.component.html',
    styleUrls: ['./wallet-transactions.component.scss']
})
export class WalletTransactionsComponent implements OnInit {

    transactions: any[] = [];
    search: string;
    dataSource: MatTableDataSource<any>;
    displayColumns = ['date', 'sector', 'amount', 'type', 'message'];

    constructor(
        private route: ActivatedRoute,
        private http: ShebaHttpService,
        private storage: StorageService
    ) {
        this.route.data.subscribe(res => {
            this.setData(res.transaction);
        });
    }

    ngOnInit() {
    }

    setData(data) {
        this.transactions = data as any[];
        this.dataSource = new MatTableDataSource(this.transactions);
    }

    applyFilter(filter) {
        const filterParams = {
            limit: '10',
            offset: filter.page.toString()
        };

        if (filter.type && filter.type !== 'all') {
            filterParams['type'] = filter.type;
        }

        if (filter.sector && filter.sector !== 'all') {
            filterParams['sector'] = filter.sector;
        }

        if (filter.start_date && filter.end_date) {
            filterParams['start_date'] = filter.start_date;
            filterParams['end_date'] = filter.end_date;
        }

        this.getFilteredDepartments(filterParams);
    }

    getFilteredDepartments(filters) {
        return this.http.get('v2/businesses/' + this.storage.user.business_id + '/transactions',
            {
                params: filters,
                responseType: 'text'
            }).toPromise().then(res => {
            this.setData(JSON.parse(res).business_transaction || []);
        });
    }

}
