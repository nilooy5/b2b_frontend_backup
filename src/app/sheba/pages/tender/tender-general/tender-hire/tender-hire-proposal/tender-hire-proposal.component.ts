import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {ShebaHttpService} from 'src/app/modules/sheba-http/sheba-http.service';
import {TenderProposalVerificationComponent} from './modals/tender-proposal-verification/tender-proposal-verification.component';

@Component({
    selector: 'app-tender-hire-proposal',
    templateUrl: './tender-hire-proposal.component.html',
    styleUrls: ['./tender-hire-proposal.component.scss']
})

export class TenderHireProposalComponent implements OnInit, OnDestroy {

    tenderId: string;
    bidId: string;
    tenderHireDetails: any;

    constructor(private activatedRoute: ActivatedRoute,
                private dialog: MatDialog,
                private http: ShebaHttpService,
                private router: Router
    ) {
        this.tenderId = activatedRoute.snapshot.params.id;
        this.bidId = activatedRoute.snapshot.params.bid_id;
        activatedRoute.data.subscribe(res => {
            if (res.tenderHireDetails.code === 422) {
                this.router.navigate(['/', 'tender', this.tenderId, 'hire', this.bidId, 'access-denied']).catch(err => {
                    console.log(err);
                });
            } else if (res.tenderHireDetails.code === 200) {
                this.tenderHireDetails = res.tenderHireDetails.data;
            } else {
                this.router.navigate(['/', 'tender', this.tenderId, 'hire', this.bidId, 'not-found']).catch(err => {
                    console.log(err);
                });
            }
        });
    }

    ngOnInit() {
        this.displayOrHideFooter('none');
    }

    displayOrHideFooter(value: string) {
        document.getElementById('footer').style.display = value;
    }

    ngOnDestroy() {

        this.displayOrHideFooter('block');
    }

    rejectProposal() {
        this.openOTPModal('rejected');
    }

    acceptProposal() {
        this.openOTPModal('accepted');
    }

    openOTPModal(action: any) {
        const apiUrl = 'v2/businesses/tenders/' + this.tenderId + '/proposal/' + this.bidId + '/send-pin';
        this.http.get(apiUrl).subscribe(res => {
            if (res.code === 200) {
                const res_token = res.data.token;
                const data = {
                    type: 'default',
                    title: 'Enter phone number',
                    text: 'We will send you a verification to this number to verify yourself ',
                    actionText: 'CONTINUE',
                    token: res_token,
                    phoneNo: res.data.mobile,
                    skipToPin: true,
                    actionName: action,
                    tenderID: this.tenderId,
                    bidId: this.bidId
                };

                this.dialog.open(TenderProposalVerificationComponent, {
                    data,
                    width: '570px',
                    height: '450px',
                    panelClass: 'dialog-confirmation'
                });
            } else {
                console.log('error');
            }
        });
    }
}
