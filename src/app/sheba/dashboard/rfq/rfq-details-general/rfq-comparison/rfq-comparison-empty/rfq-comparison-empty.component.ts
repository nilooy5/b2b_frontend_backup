import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-rfq-comparison-empty',
    templateUrl: './rfq-comparison-empty.component.html',
    styleUrls: ['./rfq-comparison-empty.component.scss']
})
export class RfqComparisonEmptyComponent implements OnInit {

    rfqId: any;

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute) {
        this.rfqId = activatedRoute.snapshot.parent.params.id;
    }

    ngOnInit() { }

    inviteVendor() {
        this.router.navigate(['/', 'dashboard', 'rfq', 'create', 'invite'], {state: { tenderId: this.rfqId }});
    }
}
