import {Component, OnInit} from '@angular/core';
import {InspectionForm} from "../../../../../../types/fleet";
import {ActivatedRoute} from "@angular/router";
import {FleetInspectionService} from "../../../../../../services/fleet-inspection.service";

@Component({
    selector: 'app-fleet-inspection-form-details',
    templateUrl: './fleet-inspection-form-details.component.html',
    styleUrls: ['./fleet-inspection-form-details.component.scss']
})
export class FleetInspectionFormDetailsComponent implements OnInit {
    form: InspectionForm;

    constructor(
        private route: ActivatedRoute,
        private service: FleetInspectionService
    ) {
        this.service.Template.asObservable().subscribe(res => {
            if (res.event === 'update') {
                this.form = res.data;
            }
        })
        this.route.data.subscribe(res => {
            this.form = res.template;
        });


    }

    ngOnInit() {
    }

}
