import {Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDateRange } from '../../../../modules/date-range-picker/date-range';
import { DatePipe } from '@angular/common';
import { StorageService } from '../../../../services/storage.service';
import { ShebaHttpService } from '../../../../modules/sheba-http/sheba-http.service';
import { PopAlertService } from '../../../../modules/pop-alert/pop-alert.service';
import { Router } from '@angular/router';
import { RfqHomeService } from '../../home/rfq-home.service';
import { StepperService } from '../../home/stepper.service';
import { AmplitudeService } from '../../../../services/amplitude.service';
import { MatStepper } from '@angular/material';
import { getErrorMessage } from '../../../../helpers/functions';

@Component({
    selector: 'app-feature-procurement-post',
    templateUrl: './feature-procurement-post.component.html',
    styleUrls: ['./feature-procurement-post.component.scss'],
    providers: [DatePipe]
})

export class FeatureProcurementPostComponent implements OnInit {

    companyInfo: FormGroup;
    deliveryDateRange: IDateRange;
    personalInfo: FormGroup;
    rfqInfo: FormGroup;

    disableButton: boolean;
    rfqObject: any;
    showMessage = false;
    showRFQError = false;
    showPersonalInfoError = false;
    showCompanyInfoError = false;
    submitting: any;

    @ViewChild('stepper') stepper: MatStepper;

    isEditable = false;

    constructor(private formBuilder: FormBuilder,
                private datePipe: DatePipe,
                private storage: StorageService,
                private http: ShebaHttpService,
                private pop: PopAlertService,
                private router: Router,
                private rfqHomeService: RfqHomeService,
                private stepperService: StepperService,
                private amplitude: AmplitudeService) { }

    ngOnInit() {
        const date = new Date();

        this.deliveryDateRange =  {
            from: new Date(),
            to: new Date(date.setMonth(date.getMonth() + 2))
        };

        this.rfqInfo = this.formBuilder.group({
            title: ['', Validators.required],
            requirements: ['', Validators.required],
            lastDateOfSubmission: ['', Validators.required]
        });

        this.personalInfo = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]],
        });

        this.companyInfo = this.formBuilder.group({
            companyName: ['', Validators.required],
            companyAddress: ['', Validators.required],
            companyPhoneNumber: ['', [Validators.required, Validators.pattern(/^(?:01)?\d{9}\r?$/)]]
        });

        // this.stepperService.currentMessage.subscribe(message => this.showBack = message);
        // this.stepperService.currentMessage2.subscribe(stepper => {
        //     console.log(stepper);
        //     this.onClickSecondNext(stepper);
        // });

        this.personalInfo.controls.email.valueChanges.subscribe(res => {
            this.showMessage = false;
        });

        this.stepperService.currentStepBack.subscribe(res => {
            this.stepper.selectedIndex = res;
        });
    }

    get rfqFormControls() {
        return this.rfqInfo.controls;
    }

    get personalInfoFormControl() {
        return this.personalInfo.controls;
    }

    get companyInfoFormControl() {
        return this.companyInfo.controls;
    }

    firstStepper(stepper: MatStepper, index: number) {
        if (this.rfqInfo.valid) {
            this.stepperService.changeStepperIndex(index);
            const lastDateOfSubmission = this.datePipe.transform(this.rfqInfo.controls.lastDateOfSubmission.value, 'yyyy-MM-dd');
            const procurementStartDate = this.datePipe.transform(this.deliveryDateRange.from, 'yyyy-MM-dd');
            const procurementEndDate = this.datePipe.transform(this.deliveryDateRange.to, 'yyyy-MM-dd');

            this.rfqObject = {
                title: this.rfqInfo.controls.title.value,
                number_of_participants: 0,
                last_date_of_submission: lastDateOfSubmission,
                procurement_start_date: procurementStartDate,
                procurement_end_date: procurementEndDate,
                payment_options: 'Other',
                is_published: 1,
                type: 'basic',
                description: this.rfqInfo.controls.requirements.value
            };
            this.fireAmplitudeRFQInfoEvent(this.rfqInfo.getRawValue());
            stepper.next();
        } else {
            this.showRFQError = true;
        }
    }

    secondStepper(stepper: MatStepper, index: number) {
        if (this.personalInfo.valid) {
            const data = this.personalInfo.getRawValue();
            this.disableButton = true;
            this.submitting = true;
            this.fireAmplitudePersonalInfoEvent(data);
            this.rfqHomeService.checkUserProfile({ email: data.email }).toPromise().then((response) => {
                this.submitting = false;
                this.disableButton = false;
                if (response.code === 401) {
                    this.stepperService.changeStepperIndex(index);
                    stepper.next();
                } else if (response.code === 420) {
                    this.showMessage = true;
                } else {
                    this.pop.open(response.message);
                }
            });
        } else {
            this.showPersonalInfoError = true;
        }
    }

    submitRFQ() {
        if (this.companyInfo.valid) {
            const companyInfoData = this.companyInfo.getRawValue();
            const personalInfo = this.personalInfo.getRawValue();
            const rfqInfo = this.rfqInfo.getRawValue();

            const companyInfo = {
                name: companyInfoData.companyName,
                address: companyInfoData.companyAddress,
                mobile: companyInfoData.companyPhoneNumber
            };

            this.fireAmplitudeCompanyInfoEvent();

            this.submitting = true;
            this.disableButton = true;

            this.rfqHomeService.postRegistrationInfo(personalInfo).toPromise().then((memberInfo) => {
                if (memberInfo.code === 200) {
                    this.storage.user = memberInfo.info;
                    this.rfqHomeService.postBusinessInfo(companyInfo).toPromise().then((businessInfo) => {
                        if (businessInfo.code === 200) {
                            this.rfqHomeService.postRFQ(businessInfo.business_id, this.rfqObject).toPromise().then((rfqResponse) => {
                                this.submitting = false;
                                this.disableButton = false;
                                this.stepperService.changeModalStatus('close');
                                this.router.navigate(['/', 'dashboard', 'success'], {queryParams: {procurementId: rfqResponse.id}}).then();
                            }).catch((err) => {
                                this.pop.open(getErrorMessage(err));
                            });
                        }
                    }).catch((err) => {
                        this.pop.open(getErrorMessage(err));
                    });
                }
            }).catch((err) => {
                this.pop.open(getErrorMessage(err));
            });
        } else {
            this.showCompanyInfoError = true;
        }
    }

    getMinimumDateForDelivery(): Date {
        return new Date();
    }

    getMinimumDateForSubmission(): Date {
        return new Date();
    }

    updateDeliveryDate(range: IDateRange) {
        this.deliveryDateRange = range;
    }

    fireAmplitudeRFQInfoEvent(data) {
        const procurementStartDate = this.datePipe.transform(this.deliveryDateRange.from, 'yyyy-MM-dd');
        const procurementEndDate = this.datePipe.transform(this.deliveryDateRange.to, 'yyyy-MM-dd');
        this.amplitude.fireCustomEvent('Post_RFQ_Details', {
            Title: data.title,
            Requirements: data.requirements,
            Schedule: procurementStartDate + ' - ' + procurementEndDate
        });
    }

    fireAmplitudePersonalInfoEvent(personalData) {
        const rfqData = this.rfqInfo.getRawValue();
        const procurementStartDate = this.datePipe.transform(this.deliveryDateRange.from, 'yyyy-MM-dd');
        const procurementEndDate = this.datePipe.transform(this.deliveryDateRange.to, 'yyyy-MM-dd');
        this.amplitude.fireCustomEvent('Post_RFQ_Details', {
            Title: rfqData.title,
            Requirements: rfqData.requirements,
            Schedule: procurementStartDate + ' - ' + procurementEndDate,
            Name: personalData.name,
            'Office Email': personalData.email
        });
    }

    fireAmplitudeCompanyInfoEvent() {
        const rfqData = this.rfqInfo.getRawValue();
        const personalData = this.personalInfo.getRawValue();
        const companyData = this.companyInfo.getRawValue();
        const procurementStartDate = this.datePipe.transform(this.deliveryDateRange.from, 'yyyy-MM-dd');
        const procurementEndDate = this.datePipe.transform(this.deliveryDateRange.to, 'yyyy-MM-dd');
        this.amplitude.fireCustomEvent('Post_RFQ_Details', {
            Title: rfqData.title,
            Requirements: rfqData.requirements,
            Schedule: procurementStartDate + ' - ' + procurementEndDate,
            Name: personalData.name,
            'Office Email': personalData.email,
            'Company Name': companyData.companyName,
            'Company address': companyData.companyAddress,
        });
    }

    // onClickSecondNext(stepper: MatStepper) {
    //     console.log(stepper);
    //     if (stepper.selectedIndex === 1) {
    //         stepper.previous();
    //     }
    //     // console.log(stepper.selectedIndex);
    //     // this.stepperService.changeMessage(true);
    //     // stepper.next();
    //     // console.log(stepper);
    // }


    move(index: number) {
        console.log(this.stepper);
        console.log(index);
        this.stepper.selectedIndex = index;
    }
}
