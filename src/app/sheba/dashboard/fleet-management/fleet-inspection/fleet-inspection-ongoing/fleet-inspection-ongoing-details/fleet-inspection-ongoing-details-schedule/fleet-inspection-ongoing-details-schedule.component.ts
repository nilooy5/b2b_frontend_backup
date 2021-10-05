import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-fleet-inspection-ongoing-details-schedule',
    templateUrl: './fleet-inspection-ongoing-details-schedule.component.html',
    styleUrls: ['./fleet-inspection-ongoing-details-schedule.component.scss']
})
export class FleetInspectionOngoingDetailsScheduleComponent implements OnInit {
    inspections: any[] = [];
    dataSource: MatTableDataSource<any>;
    displayColumns = ['vehicle', 'schedule', 'actions'];
    filter: any;

    constructor(
        private route: ActivatedRoute,
    ) {
        this.route.data.subscribe(res => {
            this.setData(res);
        });
        this.filter = {
            page: 0
        };
    }

    ngOnInit() {
    }

    setData(data) {
        this.inspections = data.inspections;
        this.dataSource = new MatTableDataSource(this.inspections);
    }

    nextPage() {
        this.filter.page = this.filter.page += 10;
    }

    PreviousPage() {
        if (this.filter.page > 1) {
            this.filter.page =  this.filter.page -= 10;
        }
    }
    OnFilter(){}
}
