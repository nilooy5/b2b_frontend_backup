import { Component, OnInit } from '@angular/core';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {ShebaHttpService} from '../../../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../../../services/storage.service';
import {PopAlertService} from '../../../../../../modules/pop-alert/pop-alert.service';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs';

@Component({
    selector: 'app-inspection-history-list',
    templateUrl: './inspection-history-list.component.html',
    styleUrls: ['./inspection-history-list.component.scss']
})
export class InspectionHistoryListComponent implements OnInit {
    histories: any[] = [];
    dataSource: MatTableDataSource<any>;
    displayColumns = ['vehicle', 'submitted', 'inspection_form', 'user', 'failed_items', 'actions'];
    forms: any[] = [];

    constructor(
        private route: ActivatedRoute,
        private http: ShebaHttpService,
        private storage: StorageService,
        private pop: PopAlertService,
    ) {
        this.route.data.subscribe(res => {
            this.setData(res);
            this.forms = res.forms || [];
        });
    }

    ngOnInit() {
    }

    setData(data) {
        this.histories = data.histories;
        this.dataSource = new MatTableDataSource(this.histories);
    }

    applyFilter(filter) {
        const filterParams = {
            limit: '10',
            offset: filter.page.toString()
        };

        if (filter.form) { filterParams['inspection_form'] = filter.form; }

        this.getFilteredHistory(filterParams);
    }

    applySort(sort) {
        if (sort) {
            this.histories = this.histories.reverse();
            this.dataSource = new MatTableDataSource(this.histories);
        }
    }

    getFilteredHistory(filters) {
        this.http.get('v2/members/' + this.storage.user.member_id + '/inspections',
            {
                params: filters,
                responseType: 'text'
            }).toPromise()
            .then(res => {
                this.setData({
                    histories: JSON.parse(res).inspection_lists
                });
            });
    }
}
