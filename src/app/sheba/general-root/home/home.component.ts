import {Component, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {HomeShowcase, HomeFeatureSection} from '../../../types/general';
import {WINDOW} from "@ng-toolkit/universal";
import {of} from "rxjs";
import {delay} from "rxjs/operators";
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {AmplitudeService} from '../../../services/amplitude.service';
import {BsModalRef, BsModalService, ModalOptions} from 'ngx-bootstrap';
declare var ga;

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class HomeComponent implements OnInit {

    showModal = false;

    howItWorksData: HomeShowcase = {
        title: 'How to get started?', data: [
            {
                title: 'Create an Account',
                text: 'Follow few steps to create your company account on the platform.'
            },
            {
                title: 'Manage your requirement',
                text: 'Thousands of Service Providers ready to give you a great service experience.'
            },
            {
                title: 'Rate your experience',
                text: 'Once you have enjoyed the service rate your experience on the platform.'
            }
        ]
    };

    OfficeManagementData: HomeShowcase = {
        title: 'Workplace management made easy', data: [
            {
                title: 'One touch point',
                text: 'Streamline your operation by having suppliers & services rendered on the platform, get instant overview through dashboard and 7 days service warranty & 24/7 contact at your disposal.'
            },
            {
                title: 'Optimize cost',
                text: 'Implement more clarity in selecting potential suppliers and at the same time get more work done fast by choosing within thousand of ready service provider.'
            },
            {
                title: 'Employ the very best',
                text: 'Hire vetted professional based on their experience and ratings leaving no room for guesstimation with your mission critical assignments.'
            }
        ]
    };

    PricePlan: Array<any> = [
        {
            name: 'Starter',
            text: 'Basic package to get started on the platform',
            currency: '৳',
            amount: '0',
            oldAmount: '৳1090',
            amountText: '',
            actionButtonText: 'Get started',
            actionButtonLink: ['/', 'auth', 'sign-up'],
            buttonType: 'filled',
            selected: true
        },
        {
            name: 'Enterprise',
            text: 'More robust solutions to help you reach greater efficiency.',
            amount: 'Coming Soon',
            amountText: '',
            oldAmount: '',
            actionButtonText: 'Contact us',
            actionButtonLink: '',
            currency: '',
            buttonType: 'outline',
            selected: false
        }
    ];

    createYourBusinessData: HomeFeatureSection = {
        title: 'Vendor Management',
        text: 'Organize & control your vendors online through the platform to bring about greater trackability, transparency & reach exponential efficiencies.',
        img: 'https://i.ibb.co/svRgRF3/home-illustration-task.png',
        textAlignment: 'left',
        backgroundColor: '#ffffff'
    };

    manageYourRequirementsData: HomeFeatureSection = {
        title: 'Quick Purchase',
        text: 'Your time at work is limited; make the most out of it by trying Quick Purchase, where in few steps you can get most of the office chores done & dusted.',
        img: 'https://i.ibb.co/F5p8Jsp/home-illustration-leaves-1.png',
        textAlignment: 'right',
        backgroundColor: '#f7f9fb'
    };

    procurementData: HomeFeatureSection = {
        title: 'Procurement',
        text: 'Help your company by getting procurement for different operational assignments done through vetted professional on the platform along with your existing trusted suppliers. ',
        img: 'https://i.ibb.co/svRgRF3/home-illustration-task.png',
        textAlignment: 'left',
        backgroundColor: '#ffffff'
    };

    fleetManagementData: HomeFeatureSection = {
        title: 'Fleet Management',
        text: 'Onboard & then monitor your company fleet online right from keeping trace of all your vehicles, drivers & service providers from one window.',
        img: 'https://i.ibb.co/F5p8Jsp/home-illustration-leaves-1.png',
        textAlignment: 'right',
        backgroundColor: '#f7f9fb'
    };

    joinSpSectionData: any = {
        title: 'Want to serve our customers?',
        text: 'Connect with corporate companies to get more new work and grow your business. Sheba Platforms will help you in getting a jump start so you can comply and have all the tools necessary to do a great job for our corporate clients.',
        img: 'https://i.ibb.co/svRgRF3/home-illustration-task.png',
    };


    constructor(
        @Inject(WINDOW) public window: Window,
        public router: Router,
        private amplitude: AmplitudeService
    ) {
        this.setLocalStoragePopoverStatus();
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                ga('set', 'page', event.urlAfterRedirects);
                ga('send', 'pageview');
            }
        });
        this.amplitude.fireAmplitudePageViewEvent({ path: this.router.url });
    }

    ngOnInit() {
       of(null).pipe(delay(100)).toPromise().then(res => {
           this.window.scrollTo({
               top: 0,
           });
       });
    }

    setLocalStoragePopoverStatus() {
        if (JSON.parse(localStorage.getItem('showPopover'))) {
            this.showModal = true;
            localStorage.setItem('showPopover', JSON.stringify(false));
        }
    }

}
