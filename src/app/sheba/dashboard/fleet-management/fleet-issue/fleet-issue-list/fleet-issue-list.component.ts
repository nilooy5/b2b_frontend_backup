import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ShebaHttpService} from '../../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../../services/storage.service';
import {MatTableDataSource} from '@angular/material';

@Component({
    selector: 'app-fleet-issue-list',
    templateUrl: './fleet-issue-list.component.html',
    styleUrls: ['./fleet-issue-list.component.scss']
})
export class FleetIssueListComponent implements OnInit {
    issues: any[] = [];
    dataSource: MatTableDataSource<any>;
    displayColumns = ['vehicle', 'submission_id', 'issue', 'actions'];

    constructor(
        private route: ActivatedRoute,
        private http: ShebaHttpService,
        private storage: StorageService
    ) {
        this.route.data.subscribe(res => {
            this.setData(res.issues);
        });
    }

    setData(data) {
        this.issues = data as any[];
        this.dataSource = new MatTableDataSource(this.issues);
    }

    ngOnInit() {
    }

    applyFilter(filter) {
        const filterParams = {
            limit: '10',
            offset: filter.page.toString()
        };

        if (filter.type) { filterParams['type'] = filter.type; }
        if (filter.status) { filterParams['status'] = filter.status; }

        this.getFilteredIssues(filterParams);
    }

    applySort(sort) {
        if (sort) {
            this.issues = this.issues.reverse();
            this.dataSource = new MatTableDataSource(this.issues);
        }
    }

    getFilteredIssues(filters) {
        this.http.get('v2/businesses/' + this.storage.user.business_id + '/issues',
            {
                params: filters,
                responseType: 'text'
            }).toPromise()
            .then(res => {
                this.setData(JSON.parse(res).issue_lists);
            });
    }
}
