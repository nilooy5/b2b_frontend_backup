import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShebaHttpService } from '../../../../../../modules/sheba-http/sheba-http.service';
import { PopAlertService } from '../../../../../../modules/pop-alert/pop-alert.service';

@Component({
    selector: 'app-tender-participate-proposal',
    templateUrl: './tender-participate-proposal.component.html',
    styleUrls: ['./tender-participate-proposal.component.scss']
})

export class TenderParticipateProposalComponent {

    tenderDetails: any;

    constructor(private activatedRoute: ActivatedRoute,
                private http: ShebaHttpService,
                private pop: PopAlertService) {
        activatedRoute.data.subscribe(({ tenderDetails }) => this.tenderDetails = tenderDetails);
    }
}
