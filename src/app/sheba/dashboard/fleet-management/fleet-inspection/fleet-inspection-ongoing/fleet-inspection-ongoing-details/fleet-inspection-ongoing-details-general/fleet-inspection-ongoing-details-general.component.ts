import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FleetInspection} from "../../../../../../../types/fleet";

@Component({
    selector: 'app-fleet-inspection-ongoing-details-general',
    templateUrl: './fleet-inspection-ongoing-details-general.component.html',
    styleUrls: ['./fleet-inspection-ongoing-details-general.component.scss']
})
export class FleetInspectionOngoingDetailsGeneralComponent implements OnInit {
    inspection: FleetInspection;

    constructor(
        private route: ActivatedRoute
    ) {
        this.route.parent.parent.data.subscribe(res => {
            this.inspection = res.data;
        })
    }

    ngOnInit() {
    }

}
