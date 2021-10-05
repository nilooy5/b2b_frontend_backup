import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';
import * as moment from 'moment';
import {RfqStorageService} from '../../../../../../services/rfq-storage-service/rfq-storage.service';


export const MY_FORMATS = {
    parse: {
        dateInput: 'LL'
    },
    display: {
        dateInput: 'DD/MM/YYYY',
        monthYearLabel: 'YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'YYYY'
    }
};

@Component({
    selector: 'app-rfq-create-additional-info',
    templateUrl: './rfq-create-additional-info.component.html',
    styleUrls: ['./rfq-create-additional-info.component.scss'],
    providers: [
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
        },

        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ],
})

export class RfqCreateAdditionalInfoComponent implements OnInit {

    additionalInfoForm: FormGroup;
    minDate = moment();

    sharingTo: { key: number; value: string }[];
    numberOfParticipants: { key: number; value: string }[];
    categories: { id: number; name: string}[];
    paymentMethods: string[];
    deliveryTimelineObj;

    panelOpenState = false;
    showPaymentMethodInput = false;

    constructor(private activatedRoute: ActivatedRoute,
                private rfqStorageService: RfqStorageService,
                private formBuilder: FormBuilder) {
        activatedRoute.data.subscribe(({ additionalInformation }) => {
            this.setSharingOptions(additionalInformation.sharing_to);
            this.setNumberOfParticipants(additionalInformation.number_of_participants);
            this.setCategories(additionalInformation.categories);
            this.setPaymentMethods(additionalInformation.payment_strategy);
        });
        this.constructAdditionalInfoForm();

        this.showPaymentMethodInput = !!(this.rfqStorageService.AdditionalInformation && this.rfqStorageService.AdditionalInformation.payment_option);
    }

    ngOnInit() {
        this.additionalInfoForm.valueChanges.subscribe(res => {
            this.rfqStorageService.AdditionalInformation = {
                ...res,
                delivery_timeline: {
                    start_date: moment(res.delivery_timeline.start_date).format('YYYY-MM-DD'),
                    end_date: moment(res.delivery_timeline.end_date).format('YYYY-MM-DD')
                },
                last_date_of_submission: moment(res.last_date_of_submission).format('YYYY-MM-DD')
            };

        });
    }

    setSharingOptions(sharingOptions) {
        this.sharingTo = sharingOptions;
    }

    setNumberOfParticipants(numberOfParticipants) {
        this.numberOfParticipants = numberOfParticipants;
    }

    setCategories(categories) {
        this.categories = categories;
    }

    setPaymentMethods(paymentMethods) {
        this.paymentMethods = paymentMethods;
    }

    constructAdditionalInfoForm() {

        const additionalInformationData = this.rfqStorageService.AdditionalInformation;

        if (additionalInformationData) {
            this.deliveryTimelineObj = {
                startDate: moment(additionalInformationData.delivery_timeline.start_date),
                endDate: moment(additionalInformationData.delivery_timeline.end_date)
            };
        } else {
            this.deliveryTimelineObj = {
                startDate: moment(),
                endDate: moment().add('3', 'weeks')
            };
        }

        this.additionalInfoForm = this.formBuilder.group({
            sharing_to: [ additionalInformationData ? additionalInformationData.sharing_to : this.sharingTo[0].key],
            delivery_timeline: {
                start_date: moment(this.deliveryTimelineObj.startDate).format('YYYY-MM-DD'),
                end_date: moment(this.deliveryTimelineObj.endDate).format('YYYY-MM-DD')
            },
            last_date_of_submission: [ additionalInformationData ? additionalInformationData.last_date_of_submission : moment().add(6, 'days').format('YYYY-MM-DD')],
            number_of_participants: [ additionalInformationData ? additionalInformationData.number_of_participants : this.numberOfParticipants[0].key] ,
            category: [ additionalInformationData ? additionalInformationData.category : this.categories[0].id],
            payment_option: [ additionalInformationData ? additionalInformationData.payment_option : null]
        });

        this.rfqStorageService.AdditionalInformation = this.additionalInfoForm.value;
    }

    showInput(element: string) {
        if (element === 'payment') {
            this.showPaymentMethodInput = true;
        }
    }

    assignPayment(payment: any) {
        this.additionalInfoForm.controls['payment_option'].setValue(payment);
    }

    handleDeliveryTimeline(event: any) {
        this.additionalInfoForm.controls['delivery_timeline'].setValue({
            start_date: moment(event.startDate).format('YYYY-MM-DD'),
            end_date: moment(event.endDate).format('YYYY-MM-DD')
        });
    }
}
