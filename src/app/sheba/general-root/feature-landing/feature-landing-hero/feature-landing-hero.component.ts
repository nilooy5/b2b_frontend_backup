import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {StepperService} from '../../home/stepper.service';

@Component({
    selector: 'app-feature-landing-hero',
    templateUrl: './feature-landing-hero.component.html',
    styleUrls: ['./feature-landing-hero.component.scss']
})
export class FeatureLandingHeroComponent implements OnInit {

    @ViewChild('rfqModal') closeModal: ElementRef;

    stepperIndex: number;

    stepper: any;

    @Input() feature: string;

    contents: any = {
        fleet: {
            heading: 'Monitor & Manage Company Fleet',
            name: 'Fleet Management',
            image: '../../../../../assets/img/landing/banner/fleet.png',
            buttonLabel: 'Manage Fleets',
            amplitudeEventName: 'Start_REG_FLEET_Top_Banner'
        },
        facility: {
            heading: 'Manage Office Requirement from anywhere, anytime',
            name: 'Facility Management',
            image: '../../../../../assets/img/landing/banner/facility.png',
            buttonLabel: 'Manage Facilities',
            amplitudeEventName: 'Start_REG_FM_Top_Banner'
        },
        procurement: {
            heading: 'Get the suitable quote from appropriate vendors',
            name: 'Request For Quotation',
            image: '../../../../../assets/img/landing/banner/procurement.png',
            buttonLabel: 'Request Quotations',
            amplitudeEventName: 'Start_REG_RFQ_Top_Banner'
        },
        topup: {
            heading: 'Recharge all of your employee mobile numbers instantly',
            name: 'Mobile Top-up',
            image: '../../../../../assets/img/landing/banner/topUp.png',
            buttonLabel: 'Start Recharging',
            amplitudeEventName: 'Start_REG_Topup_Top_Banner'
        }
    };
    constructor(private stepperService: StepperService) {
        this.stepperService.currentStepperIndex.subscribe((index) => {
            this.stepperIndex = index;
        });

        this.stepperService.modalStatus.subscribe((res) => {
            this.close();
        });
    }

    ngOnInit() {
    }

    close() {
        this.closeModal.nativeElement.click();
    }

    stepperBack() {
        if (this.stepperIndex === 1) {
            this.stepperIndex = 0;
            this.stepperService.stepperBack(this.stepperIndex);
        }

        if (this.stepperIndex === 2) {
            this.stepperIndex = 1;
            this.stepperService.stepperBack(this.stepperIndex) ;
        }
    }
}
