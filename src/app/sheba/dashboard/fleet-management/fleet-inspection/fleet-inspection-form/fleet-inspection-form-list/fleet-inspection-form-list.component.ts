import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {InspectionForm} from "../../../../../../types/fleet";

@Component({
    selector: 'app-fleet-inspection-form-list',
    templateUrl: './fleet-inspection-form-list.component.html',
    styleUrls: ['./fleet-inspection-form-list.component.scss']
})
export class FleetInspectionFormListComponent implements OnInit {
    formList: InspectionForm[] = [];

    constructor(
        private route: ActivatedRoute
    ) {
        this.route.data.subscribe(res => {
            this.setForms(res.formList)
        })
    }

    setForms(res) {
        this.formList = res;
    }

    ngOnInit() {
    }

}
