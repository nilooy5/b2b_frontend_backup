import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ShebaHttpService} from '../../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../../services/storage.service';
import {MatTableDataSource} from '@angular/material';
import {ProcurementBidsService} from '../procurement-tender-detail/procurement-bids.service';

@Component({
    selector: 'app-procurement-tender-list',
    templateUrl: './procurement-tender-list.component.html',
    styleUrls: ['./procurement-tender-list.component.scss']
})
export class ProcurementTenderListComponent implements OnInit {
    public procurementTenderList: any;
    public filteredProcurementTenderLists: any;
    totalProcurementCount: number;
    dataSource: MatTableDataSource<any>;
    displayColumns = ['id', 'title', 'is_published', 'last_date_of_submission', 'bid_count', 'status', 'actions'];
    procurementStatuses: any = [
        {
            key: 'pending',
            title: 'Pending'
        }/*,
        {
            key: 'approved',
            title: 'Approved'
        },
        {
            key: 'rejected',
            title: 'Rejected'
        },
        {
            key: 'need_approval',
            title: 'Need Approval'
        }*/
    ];

    constructor(private route: ActivatedRoute,
                private http: ShebaHttpService,
                private router: Router,
                private procurementBidsService: ProcurementBidsService,
                private storage: StorageService) {
        this.route.data.subscribe(res => {
            this.setData(res);
        });
    }

    ngOnInit() {
    }

    setData(data) {
        if (data.procurementTenderLists.procurements && data.procurementTenderLists.procurements.length) {
            this.procurementTenderList = data.procurementTenderLists.procurements;
        }
        this.totalProcurementCount = data.procurementTenderLists.total_procurement;
        this.filteredProcurementTenderLists = this.procurementTenderList;
        this.dataSource = new MatTableDataSource(this.filteredProcurementTenderLists);
    }

    setFilteredSubscriptionOrders(filter) {
        const filterParams = {
            limit: '10',
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

        this.getFilteredProcurements(filterParams);
    }

    getFilteredProcurements(filters) {
        this.http.get('v2/businesses/' + this.storage.user.business_id + '/procurements',
            {
                params: filters,
                responseType: 'text'
            }
        ).toPromise().then(res => {
            this.setData({procurementTenderLists: JSON.parse(res) || []});
        });
    }

    handleSearch(key) {
        this.filteredProcurementTenderLists = this.procurementTenderList.filter(item => item.title.toLowerCase().includes(key.toLowerCase()));
        this.dataSource = new MatTableDataSource(this.filteredProcurementTenderLists);
    }

    handleAlphabeticSort(key) {
        key = parseInt(key, 10);
        if (key === 0) {
            this.filteredProcurementTenderLists = this.procurementTenderList;
            this.dataSource = new MatTableDataSource(this.filteredProcurementTenderLists);
        } else {
            this.filteredProcurementTenderLists = this.filteredProcurementTenderLists.sort((a, b) => {
                if (key === 1) {
                    return a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1;
                } else if (key === 2) {
                    return a.title.toLowerCase() > b.title.toLowerCase() ? -1 : 1;
                }
            });
            this.dataSource = new MatTableDataSource(this.filteredProcurementTenderLists);
        }
    }

    redirectToProcurement(id) {
        this.procurementBidsService.fetchAllBids(id).then(res => {
            // @ts-ignore
            if (res.length) {
                this.router.navigate(['/', 'dashboard', 'procurement', id]);
            } else {
                this.router.navigate(['/', 'dashboard', 'procurement', id, 'details']);
            }
        }).catch(err => {
            this.router.navigate(['/', 'dashboard', 'procurement', id, 'details']);
        });
    }
}

