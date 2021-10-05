import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-procurement-tender-hiring-success',
    templateUrl: './procurement-tender-hiring-success.component.html',
    styleUrls: ['./procurement-tender-hiring-success.component.scss']
})
export class ProcurementTenderHiringSuccessComponent implements OnInit {

    bidId;
    procurementId;

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router) {
        this.bidId = this.activatedRoute.snapshot.queryParamMap.get('id');
        this.procurementId = this.activatedRoute.snapshot.queryParamMap.get('procurement');

    }

    ngOnInit() {
    }

    onHiringDetails() {
        this.router.navigate(['/dashboard/procurement/hiring/details'], {queryParams: {id: this.bidId, procurement: this.procurementId}});
    }

}
