import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-fleet-inspection-ongoing-details-history',
    templateUrl: './fleet-inspection-ongoing-details-history.component.html',
    styleUrls: ['./fleet-inspection-ongoing-details-history.component.scss']
})
export class FleetInspectionOngoingDetailsHistoryComponent implements OnInit {
    inspections: any[] = [];
    dataSource: MatTableDataSource<any>;
    displayColumns = ['vehicle', 'schedule', 'failed_items', 'actions'];

    constructor(
        private route: ActivatedRoute,
    ) {
        this.route.data.subscribe(res => {
            this.setData(res);
        });
    }

    ngOnInit() {
    }

    setData(data) {
        this.inspections = data.inspections;
        this.dataSource = new MatTableDataSource(this.inspections);
    }

}
