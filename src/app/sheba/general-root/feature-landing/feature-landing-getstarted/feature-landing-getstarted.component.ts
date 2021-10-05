import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-feature-landing-getstarted',
    templateUrl: './feature-landing-getstarted.component.html',
    styleUrls: ['./feature-landing-getstarted.component.scss']
})
export class FeatureLandingGetstartedComponent implements OnInit {

    @Input() feature: string;

    contents: any = {
        fleet: {
            title: 'Manage Your Office Fleets- Anywhere, Anytime.',
            buttonLabel: 'Manage Fleets'
        },
        facility: {
            title: 'Manage Your Office Facilities- Anywhere, Anytime.',
            buttonLabel: 'Manage Facilities'
        },
        procurement: {
            title: 'Manage Your Office Quotations- Anywhere, Anytime.',
            buttonLabel: 'Request Quotations'
        },
        topup: {
            title: 'Manage Your Employee Top-up- Anywhere, Anytime.',
            buttonLabel: 'Start Recharging'
        }
    };

    constructor() { }

    ngOnInit() {
    }

}
