import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TableEssentials} from "../../../../../../modules/extras/general";
import {MatTableDataSource} from "@angular/material";
import {InspectionForm} from "../../../../../../types/fleet";
import {FleetInspectionService} from "../../../../../../services/fleet-inspection.service";

@Component({
    selector: 'app-fleet-inspection-ongoing-list',
    templateUrl: './fleet-inspection-ongoing-list.component.html',
    styleUrls: ['./fleet-inspection-ongoing-list.component.scss']
})
export class FleetInspectionOngoingListComponent extends TableEssentials implements OnInit {
    searchQuery: string;
    inspectionFormList: InspectionForm[];

    constructor(
        private route: ActivatedRoute,
        private service: FleetInspectionService
    ) {
        super(route, 'inspection_list');
        this.tableEvents().subscribe(res => {
            if (res.set) {
                this.setData();
                this.inspectionFormList = this.route.snapshot.data.form_list;
            }
            if (res.load) {
                this.reloadData();
            }
        });
        this.displayColumns = ['id', 'inspection_form', 'type', 'next_schedule', 'actions'];
    }

    ngOnInit() {
    }

    setData() {
        this.dataSource = new MatTableDataSource<any[]>(this.data);
    }



    reloadData() {
        this.service.getOngoingList(this.page, this.limit, this.filter).toPromise().then(res => {
            this.data = res;
            this.setData();
        }).catch(err => {
            console.log(err);
        })
    }

}
