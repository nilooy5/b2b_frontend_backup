import {Component, OnDestroy} from '@angular/core';
import {DashboardSharedService} from '../../../../services/dashboard-shared.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material';
import {ShebaHttpService} from '../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../services/storage.service';
import {environment} from '../../../../../environments/environment';

@Component({
    selector: 'app-rfq-list',
    templateUrl: './rfq-list.component.html',
    styleUrls: ['./rfq-list.component.scss']
})

export class RfqListComponent implements OnDestroy {
    static readonly ITEMS_PER_PAGE = 10;

    public procurementTenderList: any;
    public filteredProcurementTenderLists: any;
    totalProcurementCount: number;
    dataOffset = 1;
    currentLength = 0;
    show_rfq_list = false;
    sort_rfq: any = [
        {sort_column: 'sort_by_id', sort_type: 'asc'},
        {sort_column: 'sort_by_title', sort_type: 'asc'},
        {sort_column: 'sort_by_created_at', sort_type: 'asc'},
    ];
    sortObj: { name: string, type: string };
    dataSource: MatTableDataSource<any>;
    displayColumns = ['id', 'title', 'created_on', 'last_date_of_submission', 'bid_count', 'status', 'actions'];
    procurementStatuses: any = [
        {key: '', title: 'All'},
        {key: 'draft', title: 'Draft'},
        {key: 'open', title: 'Open'},
        {key: 'hired', title: 'Hired'},
        {key: 'expired', title: 'Expired'},
        {key: 'closed', title: 'Closed'},
    ];

    constructor(private dashboardSharedService: DashboardSharedService,
                private route: ActivatedRoute,
                private http: ShebaHttpService,
                private router: Router,
                private storage: StorageService) {
        dashboardSharedService.changeHeaderTitle('Tenders');
        this.route.data.subscribe(res => {
            this.setData(res);
        });
    }

    setData(data, offset = 0) {
        if (data) {
            if (data.procurementTenderLists && data.procurementTenderLists.procurements.length) {
                this.procurementTenderList = data.procurementTenderLists.procurements;
            } else {
                this.procurementTenderList = [];
                this.dataOffset = 0;
            }
            if (data.procurementTenderLists.is_procurement_available) {
                this.show_rfq_list = data.procurementTenderLists.is_procurement_available ? true : false;
            }
        } else {
            this.procurementTenderList = [];
            this.dataOffset = 0;
        }
        this.totalProcurementCount = data ? data.procurementTenderLists.total_procurement : 0;
        this.filteredProcurementTenderLists = this.procurementTenderList;
        this.currentLength = offset + this.procurementTenderList.length;
        this.dataSource = new MatTableDataSource(this.filteredProcurementTenderLists);
    }

    getLimit() {
        return RfqListComponent.ITEMS_PER_PAGE;
    }

    setFilteredSubscriptionOrders(filter) {
        const filterParams = {
            limit: this.getLimit().toString(),
            offset: filter.page.toString()
        };
        if (filter.status) {
            filterParams['status'] = filter.status;
        }
        if (filter.start_date) {
            filterParams['start_date'] = filter.start_date;
        }
        if (filter.end_date) {
            filterParams['end_date'] = filter.end_date;
        }
        if (filter.search) {
            filterParams['search'] = filter.search;
        }
        if (filter.sort_column && filter.sort_type) {
            filterParams[filter.sort_column] = filter.sort_type;
        }

        this.getFilteredProcurements(filterParams);
    }

    getFilteredProcurements(filters) {
        this.http.get('v2/businesses/' + this.storage.user.business_id + '/procurements',
            {
                params: filters,
                responseType: 'text'
            }
        ).toPromise().then(res => {
            if (JSON.parse(res).code !== 200) {
                this.dataOffset = 0;
                this.currentLength = 0;
                this.setData(null, 0);
                return;
            }
            this.dataOffset = parseInt(filters.offset) + 1;
            this.setData({procurementTenderLists: JSON.parse(res) || []}, parseInt(filters.offset));
        });
    }

    redirectToHelp() {
        return environment.help_url + 'topics?type=business&type_id=' + this.storage.user.business_id;
    }

    sort(property) {
        this.sort_rfq.forEach((status) => {
            if (status.sort_column === property) {
                this.sortObj = {
                    name: status.sort_column,
                    type: status.sort_type
                };
                status.sort_type === 'asc' ? status.sort_type = 'desc' : status.sort_type = 'asc';
            }
        });
    }

    redirectToProcurement(id) {
        this.router.navigate(['/', 'dashboard', 'rfq', 'list', id, 'details']);
    }

    ngOnDestroy() {
        this.dashboardSharedService.changeHeaderTitle(null);
    }
}
