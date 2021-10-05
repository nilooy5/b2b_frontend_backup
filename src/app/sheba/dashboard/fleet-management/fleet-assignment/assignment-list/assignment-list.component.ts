import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TableEssentials, TableEvents} from "../../../../../modules/extras/general";
import {MatTableDataSource} from "@angular/material";
import {FleetService} from "../../../../../services/fleet.service";
import {debounceTime} from "rxjs/operators";

@Component({
    selector: 'app-assignment-list',
    templateUrl: './assignment-list.component.html',
    styleUrls: ['./assignment-list.component.scss']
})
export class AssignmentListComponent extends TableEssentials implements OnInit {

    constructor(
        private route: ActivatedRoute,
        private service: FleetService
    ) {
        super(route, 'assignments');
        this.tableEvents().subscribe((res: TableEvents) => {
            if (res.set) {
                this.setData();
            }
            if (res.load) {
                this.reloadList();
            }
        });
    }

    setData() {
        this.dataSource = new MatTableDataSource(this.data);
    }

    ngOnInit() {
        this.displayColumns = ['id', 'vehicle', 'assign_to', 'assign_date', 'actions'];
    }

    reloadList() {
        this.service.getAssignments(this.page, this.limit, this.filter).pipe(debounceTime(5000)).toPromise().then(res => {
            this.data = res;
            this.setData();
        });
    }


}
