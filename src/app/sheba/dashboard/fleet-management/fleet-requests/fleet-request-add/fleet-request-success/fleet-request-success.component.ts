import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FleetService} from "../../../../../../services/fleet.service";

@Component({
    selector: 'app-fleet-request-success',
    templateUrl: './fleet-request-success.component.html',
    styleUrls: ['./fleet-request-success.component.scss']
})
export class FleetRequestSuccessComponent implements OnInit {
    requestId: number;

    constructor(
        private service: FleetService,
        private router: Router
    ) {
        this.requestId = this.service.request_id
        if (!this.requestId) {
            this.router.navigate(['/', 'dashboard', 'fleet-management', 'requests']).catch(err => {
                console.log(err);
            });
        }
    }

    ngOnInit() {
    }

}
