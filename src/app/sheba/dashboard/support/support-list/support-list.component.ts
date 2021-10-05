import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material';
import {StorageService} from '../../../../services/storage.service';
import {ShebaHttpService} from '../../../../modules/sheba-http/sheba-http.service';

@Component({
    selector: 'app-support-list',
    templateUrl: './support-list.component.html',
    styleUrls: ['./support-list.component.scss']
})
export class SupportListComponent implements OnInit {

    static readonly ITEMS_PER_PAGE = 5;

    dataSource;
    supportList;
    totalSupportCount;
    filteredSupportList;

    displayedColumns = ['id', 'status', 'created_at' , 'closed_at', 'details', 'actions'];
    supportStatus: any = [
        {
            key: '',
            title: 'All'
        },
        {
            key: 'open',
            title: 'Open'
        },
        {
            key: 'closed',
            title: 'Closed'
        }
    ];

    constructor(private route: ActivatedRoute,
                private http: ShebaHttpService,
                private storage: StorageService,
                private router: Router) {
        this.route.data.subscribe(res => this.setSupportList(res));
    }

    ngOnInit() { }

    setSupportList(data) {
        if (data.supportList.supports && data.supportList.supports.length) {
            this.supportList = data.supportList.supports;
        } else {
            this.supportList = [];
        }
        this.totalSupportCount = data.supportList.filtered_supports;
        this.filteredSupportList = this.supportList;
        this.dataSource = new MatTableDataSource(this.filteredSupportList);
    }

    getLimit() {
        return SupportListComponent.ITEMS_PER_PAGE;
    }

    limitString(str) {
        return (str && str.length > 40) ? str.slice(0, 40) + '..' : str;
    }

    setFilteredSupportList(filter) {
        const filterParams = {
            limit: this.getLimit().toString(),
            offset: filter.page.toString()
        };
        if (filter.start_date && filter.end_date) {
            filterParams['start_date'] = filter.start_date;
            filterParams['end_date'] = filter.end_date;
        }
        if (filter.status) {
            if (filter.status !== 'all') {
                filterParams['status'] = filter.status;
            }
        } else {
            filterParams['status'] = 'open';
        }
        this.getFilteredSupport(filterParams);
    }

    redirectToSupport(id) {
        const url = this.router.serializeUrl(this.router.createUrlTree(['/dashboard/support/' + id]));
        window.open(url, '_blank');
    }

    getFilteredSupport(filters) {
        this.http.get('v2/businesses/' + this.storage.user.business_id + '/supports',
            {
                params: filters,
                responseType: 'text'
            }).toPromise().then(res => this.setSupportList({supportList: JSON.parse(res) || []}));
    }

    handleSearch(key) {
        this.filteredSupportList = this.supportList.filter(item => {
            return item.id.toString().includes(key) ||
                   item.long_description.toLowerCase().includes(key.toLowerCase());
        });
        this.dataSource = new MatTableDataSource(this.filteredSupportList);
    }

    trackByFn(index, item) {
        return index;
    }

}
