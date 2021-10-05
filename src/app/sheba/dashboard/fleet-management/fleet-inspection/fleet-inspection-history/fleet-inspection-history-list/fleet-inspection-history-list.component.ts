import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {ShebaHttpService} from '../../../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../../../services/storage.service';

@Component({
    selector: 'app-fleet-inspection-history-list',
    templateUrl: './fleet-inspection-history-list.component.html',
    styleUrls: ['./fleet-inspection-history-list.component.scss']
})
export class FleetInspectionHistoryListComponent implements OnInit {
    inspections: any[] = [];
    info: any = null;
    dataSource: MatTableDataSource<any>;
    displayColumns = ['vehicle', 'submitted', 'inspection_form', 'inspector', 'failed_items', 'actions'];
    forms: any[] = [];

    constructor(
        private route: ActivatedRoute,
        private http: ShebaHttpService,
        private storage: StorageService
    ) {
        this.route.data.subscribe(res => {
            this.setData(res.inspections.inspections);
            this.info = res.inspections.info;

            this.forms = res.forms || [];
        });
    }

    setData(data) {
        this.inspections = data as any[];
        this.dataSource = new MatTableDataSource(this.inspections);
    }

    ngOnInit() {
    }

    applyFilter(filter) {
        const filterParams = {
            limit: '10',
            offset: filter.page.toString()
        };

        if (filter.start_date) { filterParams['start_date'] = filter.start_date; }
        if (filter.end_date) { filterParams['end_date'] = filter.end_date; }
        if (filter.form) { filterParams['inspection_form'] = filter.form; }

        this.getFilteredInspections(filterParams);
    }

    applySort(sort) {
        if (sort) {
            this.inspections = this.inspections.reverse();
            this.dataSource = new MatTableDataSource(this.inspections);
        }
    }

    getFilteredInspections(filters) {
        this.http.get('v2/businesses/' + this.storage.user.business_id + '/inspections',
        {
            params: filters,
            responseType: 'text'
        }).toPromise()
        .then(res => {
            this.setData(JSON.parse(res).inspection_lists);
        });
    }
}
