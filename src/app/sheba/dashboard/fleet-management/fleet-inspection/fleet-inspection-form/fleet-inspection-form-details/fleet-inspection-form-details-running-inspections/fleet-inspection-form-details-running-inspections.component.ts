import {Component, OnInit} from '@angular/core';
import {TableEssentials} from "../../../../../../../modules/extras/general";
import {ActivatedRoute} from "@angular/router";
import {MatTableDataSource} from "@angular/material";

@Component({
    selector: 'app-fleet-inspection-form-details-running-inspections',
    templateUrl: './fleet-inspection-form-details-running-inspections.component.html',
    styleUrls: ['./fleet-inspection-form-details-running-inspections.component.scss']
})
export class FleetInspectionFormDetailsRunningInspectionsComponent extends TableEssentials implements OnInit {

    constructor(
        private route: ActivatedRoute
    ) {
        super(route.parent.parent, 'template');
        this.tableEvents().subscribe(e => {
            if (e.set) {
                this.setData();
            } else if (e.load) {

            }
        });
        this.displayColumns=['id','type','schedule_date'];
    }

    setData() {
        this.dataSource = new MatTableDataSource<any[]>(this.data.inspections);
    }

    ngOnInit() {
    }

}
