import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-tender-hire-confirmation',
    templateUrl: './tender-hire-confirmation.component.html',
    styleUrls: ['./tender-hire-confirmation.component.scss'],
})

export class TenderHireConfirmationComponent implements OnInit {
    tenderID: string;
    bidId: string;
    confirmationType: string; // Can be : Accepted, Rejected, Failed
    icon: string;
    acceptedIcon: string;
    message: string;
    failedIcon: string;

    constructor(activatedRoute: ActivatedRoute, private router: Router) {
        this.tenderID = activatedRoute.snapshot.parent.params.id;
        this.bidId = activatedRoute.snapshot.parent.params.bid_id;
        this.confirmationType = activatedRoute.snapshot.data.confirmationType;

        if (
            this.confirmationType === 'Rejected' ||
            this.confirmationType === 'Accepted' ||
            this.confirmationType === 'Denied' ||
            this.confirmationType === 'NotFound'
        ) {
            this.icon = '/assets/svg/icons/rfq/check.svg';
            if (this.confirmationType === 'Accepted') {
                this.message = 'Order accepted successfully!';
            } else if (this.confirmationType === 'Rejected') {
                this.message = 'Rejected Successfully!';
            } else if (this.confirmationType === 'Denied') {
                this.icon = '/assets/svg/icons/rfq/cancel.svg';
                this.message = 'Vendor already hired';
            } else if (this.confirmationType === 'NotFound') {
                this.message = 'Request item not found.';
            }
        } else {
            this.icon = '/assets/svg/icons/rfq/cancel.svg';
            this.message = 'Request unsuccessful!';
        }
    }

    ngOnInit() {
    }

    tryAgain() {
        this.router
            .navigate(['/', 'tender', this.tenderID, 'hire', this.bidId])
            .catch((err) => {
                console.log(err);
            });
    }
}
