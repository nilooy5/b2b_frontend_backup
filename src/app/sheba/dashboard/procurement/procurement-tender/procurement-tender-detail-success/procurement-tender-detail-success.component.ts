import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-procurement-tender-detail-success',
    templateUrl: './procurement-tender-detail-success.component.html',
    styleUrls: ['./procurement-tender-detail-success.component.scss']
})
export class ProcurementTenderDetailSuccessComponent implements OnInit {

    isPublished;
    procurementID;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
    ) {
        this.isPublished = this.activatedRoute.snapshot.queryParamMap.get('publish');
        this.procurementID = this.activatedRoute.snapshot.queryParamMap.get('procurementId');
        console.log(this.procurementID);

    }

    ngOnInit() {
    }

    onRFQDetails() {
        this.router.navigate(['/dashboard/procurement', this.procurementID, 'details']);
    }

}
