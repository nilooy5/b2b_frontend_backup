import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {ShebaHttpService} from '../../../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../../../services/storage.service';
import {PopAlertService} from '../../../../../../modules/pop-alert/pop-alert.service';

@Component({
    selector: 'app-inspection-schedule-list',
    templateUrl: './inspection-schedule-list.component.html',
    styleUrls: ['./inspection-schedule-list.component.scss']
})
export class InspectionScheduleListComponent implements OnInit {
    inspections: any[] = [];
    dataSource: MatTableDataSource<any>;
    displayColumns = ['vehicle', 'submitted', 'inspection_form', 'id', 'actions'];
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
        this.inspections = data.inspections;
        this.dataSource = new MatTableDataSource(this.inspections);
    }

    applyFilter(filter) {
        const filterParams = {
            limit: '10',
            filter: 'open',
            offset: filter.page.toString()
        };

        if (filter.form) { filterParams['inspection_form'] = filter.form; }
        if (filter.type) { filterParams['type'] = filter.type; }

        this.getFilteredInspections(filterParams);
    }

    applySort(sort) {
        if (sort) {
            this.inspections = this.inspections.reverse();
            this.dataSource = new MatTableDataSource(this.inspections);
        }
    }

    getFilteredInspections(filters) {
        this.http.get('v2/members/' + this.storage.user.member_id + '/inspections',
            {
                params: filters,
                responseType: 'text'
            }).toPromise()
            .then(res => {
                this.setData({
                    inspections: JSON.parse(res).inspection_lists
                });
            });
    }

}
