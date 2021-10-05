import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {StorageService} from '../../../../services/storage.service';
import {IDateRange} from '../../../../modules/date-range-picker/date-range';
import {environment} from '../../../../../environments/environment';
import {ShebaHttpService} from '../../../../modules/sheba-http/sheba-http.service';


@Component({
    selector: 'app-wallet-transactions-filter',
    templateUrl: './wallet-transactions-filter.component.html',
    styleUrls: ['./wallet-transactions-filter.component.scss']
})
export class WalletTransactionsFilterComponent implements OnInit {
    walletAmount = null;
    filter: any;
    sort: 0;
    transactionTypes: any[] = ['debit', 'credit', 'all'];
    transactionSectors: any[] = ['sms', 'subscription', 'all'];
    dateRange: IDateRange = {
        from: new Date((new Date()).getFullYear() + '-1-1'),
        to: new Date()
    };
    @Output() filterEmitter: EventEmitter <any> = new EventEmitter();
    @Output() sortEmitter: EventEmitter <any> = new EventEmitter();
    reportDownloadUrl;

    constructor(
        private storage: StorageService,
        private http: ShebaHttpService
    ) {
        const businessId = this.storage.user.business_id;
        const userToken = this.storage.user.token;

        const businessInfo = this.storage.getData('business_info');
        this.walletAmount = businessInfo.wallet;

        this.reportDownloadUrl = environment.api_url + '/v2/businesses/' + businessId + '/download-transactions?token=' + userToken;

        this.filter = {
            type: null,
            sector: null,
            start_date: null,
            end_date: null,
            page: 0,
            sort: null
        };
    }

    ngOnInit() {
    }

    OnRangeSelected({from, to}) {
        this.filter.start_date = this.getApiFormat(from);
        this.filter.end_date = this.getApiFormat(to);

        this.emitFilter();
    }

    getApiFormat(date) {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) { month = '0' + month; }
        if (day.length < 2) { day = '0' + day; }

        return [year, month, day].join('-');
    }

    emitFilter() {
        this.filterEmitter.emit(this.filter);
    }

    // emitSort() {
    //     this.filterEmitter.emit(this.filter);
    // }

    nextPage() {
        this.filter.page = this.filter.page += 10;
        this.emitFilter();
    }

    PreviousPage() {
        if (this.filter.page > 1) {
            this.filter.page =  this.filter.page -= 10;
            this.emitFilter();
        }
    }
}
