import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FleetInspectionService} from "../../../../../../services/fleet-inspection.service";
import {TableEssentials} from "../../../../../../modules/extras/general";
import {MatDialog, MatTableDataSource} from "@angular/material";
import {FleetInspectionFailedItem, InspectionForm} from "../../../../../../types/fleet";
import {FleetInspectionFailedItemDetailsComponent} from "../fleet-inspection-failed-item-details/fleet-inspection-failed-item-details.component";

@Component({
    selector: 'app-fleet-inspection-failed-item-list',
    templateUrl: './fleet-inspection-failed-item-list.component.html',
    styleUrls: ['./fleet-inspection-failed-item-list.component.scss']
})
export class FleetInspectionFailedItemListComponent extends TableEssentials implements OnInit {
    forms: InspectionForm[];

    constructor(
        private route: ActivatedRoute,
        private service: FleetInspectionService,
        private dialog: MatDialog
    ) {
        super(route, 'data');
        this.route.data.subscribe(res => {
            this.forms = res.forms;
        });
        this.tableEvents().subscribe(res => {
            if (res.set) {
                this.setData();
            }
            if (res.load) {
                this.loadData();
            }
        });
    }

    ngOnInit() {
        this.displayColumns = ['date', 'vehicle', 'item', 'remarks', 'actions'];
    }

    setData() {
        this.dataSource = new MatTableDataSource<FleetInspectionFailedItem[]>(this.data.list);
    }

    loadData() {
        this.service.getFailedItemsList(this.page, this.limit, this.filter).toPromise().then(res => {
            this.data = res;
            this.setData();
        }).catch(err => {
            console.log(err);
        })
    }

    showItem(item: FleetInspectionFailedItem) {
        const ref = this.dialog.open(FleetInspectionFailedItemDetailsComponent, {
            minHeight: '80vh',
            minWidth: '600px',
            data: {item: item},
            panelClass: 'failed-item-modal',
            closeOnNavigation: true
        })
        ref.afterClosed().subscribe(res => {
            if (res) {
                this.loadData();
            }
        })
    }
}
