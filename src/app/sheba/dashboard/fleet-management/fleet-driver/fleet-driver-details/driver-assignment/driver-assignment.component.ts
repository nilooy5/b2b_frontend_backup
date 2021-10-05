import { Component, OnInit } from '@angular/core';

import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-driver-assignment',
    templateUrl: './driver-assignment.component.html',
    styleUrls: ['./driver-assignment.component.scss']
})
export class DriverAssignmentComponent implements OnInit {

    assignments: any[];

    constructor(
        private route: ActivatedRoute,
    ) {
        this.route.data.subscribe(res => {
            this.setData(res);
        });
    }

    ngOnInit() {
    }

    setData(data: any) {
        this.assignments = data.assignments;
    }

}
