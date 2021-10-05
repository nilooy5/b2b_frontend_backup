import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TripRequest} from "../../../../../types/fleet";
import {appConfig} from "../../../../../config/app.config";
import {FleetService} from "../../../../../services/fleet.service";
import {differenceInCalendarDays, differenceInHours} from "date-fns";

@Component({
    selector: 'app-assignment-details',
    templateUrl: './assignment-details.component.html',
    styleUrls: ['./assignment-details.component.scss']
})
export class AssignmentDetailsComponent implements OnInit {
    tripRequest: TripRequest;
    appConfig = appConfig;

    constructor(
        private route: ActivatedRoute,
        private service: FleetService
    ) {
        this.route.data.subscribe(res => {
            this.tripRequest = res.details;
        })
    }

    ngOnInit() {
    }

    OnComments(state) {
        if (state) {
            this.resetTrip();
        }
    }

    resetTrip() {
        this.service.getTripDetails(this.tripRequest.id).toPromise().then(res => {
            this.tripRequest = res;
        })
    }

    differenceText() {

        try {
            const start_date = new Date(Date.parse(this.tripRequest.start_date));
            const end_date = new Date(Date.parse(this.tripRequest.end_date));
            const diff = (differenceInHours(end_date, start_date) / 24);
            return diff > 1 ? diff.toFixed(2) + ' Days' : diff.toFixed(2) + ' Day';
        } catch (e) {
            return ''
        }

    }
}
