import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-tender-participate-confirmation',
    templateUrl: './tender-participate-confirmation.component.html',
    styleUrls: ['./tender-participate-confirmation.component.scss']
})
export class TenderParticipateConfirmationComponent implements OnInit {

    tenderID: number;
    confirmationType: string;

    constructor(activatedRoute: ActivatedRoute) {
        this.tenderID = activatedRoute.snapshot.parent.params.id;
        this.confirmationType = activatedRoute.snapshot.data.confirmationType;
    }

    ngOnInit() {
    }

}
