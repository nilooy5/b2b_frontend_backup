import {Component, Input, OnInit} from '@angular/core';
import * as $ from 'jquery';
import {delay} from 'rxjs/operators';

@Component({
    selector: 'app-feature-landing-how-it-works',
    templateUrl: './feature-landing-how-it-works.component.html',
    styleUrls: ['./feature-landing-how-it-works.component.scss']
})

export class FeatureLandingHowItWorksComponent implements OnInit {

    @Input() feature: string;

    contents: any = {
        facility: [
            {
                index: 0,
                label: 'Choose The Service Required',
                image: '../../../../../assets/img/landing/how-it-works/facility/select-service.png',
            },
            {
                index: 1,
                label: 'Select Verified Vendor',
                image: '../../../../../assets/img/landing/how-it-works/facility/verified-vendors.png',
            },
            {
                index: 2,
                label: 'Manage Your Order',
                image: '../../../../../assets/img/landing/how-it-works/facility/manage-your-order.png',
            },
        ],
        fleet: [
            {
                index: 0,
                label: 'Onboard The Fleet',
                image: '../../../../../assets/img/landing/how-it-works/fleet/onboard-fleet.png',
            },
            {
                index: 1,
                label: 'Send Request For A Trip',
                image: '../../../../../assets/img/landing/how-it-works/fleet/trip-request.png',
            },
            {
                index: 2,
                label: 'Manage Trip Requests',
                image: '../../../../../assets/img/landing/how-it-works/fleet/manage-fleet.png',
            },
        ],
        procurement: [
            {
                index: 0,
                label: 'Publish Your Requirements',
                image: '../../../../../assets/img/landing/how-it-works/rfq/rfq-create.png',
            },
            {
                index: 1,
                label: 'Get Quotation From Verified Vendors',
                image: '../../../../../assets/img/landing/how-it-works/rfq/quotations.png',
            },
            {
                index: 2,
                label: 'Select The Most Suitable Quotation',
                image: '../../../../../assets/img/landing/how-it-works/rfq/hire.png',
            },
        ],
        topup: [
            {
                index: 0,
                label: 'Recharge Sheba Wallet',
                image: '../../../../../assets/img/landing/how-it-works/top-up/recharge.png',
            },
            {
                index: 1,
                label: 'Insert Mobile Number',
                image: '../../../../../assets/img/landing/how-it-works/top-up/insert-mobile-number.png',
            },
            {
                index: 2,
                label: 'Get Recharge Report Instantly',
                image: '../../../../../assets/img/landing/how-it-works/top-up/report.png',
            },
        ],
    };

    /* START: Image Slider & Clicked Steps Function */

    // Storing Set Interval Function
    refreshInterval: any;

    imageSlider(index: number) {

        let progressCount = index;

        this.refreshInterval = setInterval(() => {
            $('.process-panel:eq(' + progressCount + ')').removeClass('active');
            $('.phone-skin .display:eq(' + (progressCount - 1) + ')').removeClass('post-active');
            $('.phone-skin .display:eq(' + progressCount + ')').removeClass('active');
            $('.process-icon:eq(' + progressCount + ')').removeClass('active');
            $('.underline:eq(' + progressCount + ')').removeClass('active');

            if (progressCount < 2) {
                progressCount++;
            } else {
                progressCount = 0;
            }

            $('.process-panel:eq(' + progressCount + ')').addClass('active');
            $('.phone-skin .display:eq(' + (progressCount - 1) + ')').addClass('post-active');
            $('.phone-skin .display:eq(' + progressCount + ')').addClass('active');
            $('.process-icon:eq(' + progressCount + ')').addClass('active');
            $('.underline:eq(' + progressCount + ')').addClass('active');

        }, 3000);

    }

    activatePanel(index: number) {

        clearInterval(this.refreshInterval);

        $('.process-panel').removeClass('active');
        $('.phone-skin .display').removeClass('post-active');
        $('.phone-skin .display').removeClass('active');
        $('.process-icon').removeClass('active');
        $('.underline').removeClass('active');


        $('.process-panel:eq(' + index + ')').addClass('active');
        $('.phone-skin .display:eq(' + (index - 1) + ')').addClass('post-active');
        $('.phone-skin .display:eq(' + index + ')').addClass('active');
        $('.process-icon:eq(' + index + ')').addClass('active');
        $('.underline:eq(' + index + ')').addClass('active');
        this.imageSlider(index);

    }
    /* END: Image Slider & Clicked Steps Function */

    constructor() { }

    ngOnInit() {

        // START: How It Works - Steps
        setTimeout(() => {
            const index = 0;
            this.activatePanel(index);
        }, 100);
        // END: How It Works - Steps

    }

}
