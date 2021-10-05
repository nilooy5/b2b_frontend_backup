import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-vehicle-details-assignment',
    templateUrl: './vehicle-details-assignment.component.html',
    styleUrls: ['./vehicle-details-assignment.component.scss']
})
export class VehicleDetailsAssignmentComponent implements OnInit {

    assignments: any[];

    constructor(
        private route: ActivatedRoute,
    ) {
        this.route.data.subscribe(res => {
            this.setData(res);
        });
    }

    ngOnInit() {
        console.log(this.assignments);
    }

    setData(data: any) {
        this.assignments = data.assignments;
    }
}
