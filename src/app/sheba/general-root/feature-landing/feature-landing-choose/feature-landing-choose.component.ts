import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-feature-landing-choose',
  templateUrl: './feature-landing-choose.component.html',
  styleUrls: ['./feature-landing-choose.component.scss']
})
export class FeatureLandingChooseComponent implements OnInit {

    @Input() feature: string;

    contents: any = {
        fleet: [
            {
                image: '../../../../../assets/img/landing/why-choose-us/gear.svg',
                label: 'All Features in One',
                description: 'Everything on Fleet Management, from one dashboard.'
            },
            {
                image: '../../../../../assets/img/landing/why-choose-us/car.svg',
                label: 'Onboarding Drivers Made Easy',
                description: 'Easy document upload process. Easy monitoring process to check their track records.'
            },
            {
                image: '../../../../../assets/img/landing/why-choose-us/cart.svg',
                label: 'Easy Invitation Process to Trusted Vendors',
                description: 'Invite verified vendors from single platform whenever needed.'
            },
        ],
        facility: [
            {
                image: '../../../../../assets/img/landing/why-choose-us/gear.svg',
                label: 'Verified Experts',
                description: 'All listed experts, with their vast experience in the field of their provided service.'
            },
            {
                image: '../../../../../assets/img/landing/why-choose-us/car.svg',
                label: 'Budget Friendly',
                description: 'Fix your budget. Find the most suitable option from all the options.'
            },
            {
                image: '../../../../../assets/img/landing/why-choose-us/cart.svg',
                label: 'Secured Payment Methods',
                description: 'End-to-end security for the payment- whatever method you choose.'
            },
        ],
        procurement: [
            {
                image: '../../../../../assets/img/landing/why-choose-us/gear.svg',
                label: 'Get the Best Quotation',
                description: 'Easy publishing process for the quotation, pick the best quotation for you.'
            },
            {
                image: '../../../../../assets/img/landing/why-choose-us/car.svg',
                label: 'Paperless Process',
                description: 'Everything online. Hence, on the go.'
            },
            {
                image: '../../../../../assets/img/landing/why-choose-us/cart.svg',
                label: 'Select Suitable Payment Option',
                description: 'Be it bank transfer or any other secured online payment, you decide.'
            },
        ],
        topup: [
            {
                image: '../../../../../assets/img/landing/why-choose-us/gear.svg',
                label: 'Secured SSL Encrypted Payment',
                description: 'End-to-end encrypted payment method, for maximum security.'
            },
            {
                image: '../../../../../assets/img/landing/why-choose-us/car.svg',
                label: 'Instant Cashback',
                description: 'Instant cashback upon successful recharge. On the contrary, instant refund upon failed transaction.'
            },
            {
                image: '../../../../../assets/img/landing/why-choose-us/cart.svg',
                label: 'Bulk Recharge Option',
                description: 'Up to 100,000 mobile number recharge option at a time, all in real time.'
            },
        ],
    };

    constructor() { }

    ngOnInit() { }
}
