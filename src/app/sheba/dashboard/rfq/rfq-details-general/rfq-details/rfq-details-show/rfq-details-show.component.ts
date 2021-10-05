import {Component, OnDestroy, OnInit} from '@angular/core';
import {Breadcrumb} from '../../../../../../types/general';
import {ActivatedRoute} from '@angular/router';
import {DashboardSharedService} from '../../../../../../services/dashboard-shared.service';
import * as moment from 'moment';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {PopAlertService} from '../../../../../../modules/pop-alert/pop-alert.service';
import {ShebaHttpService} from '../../../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../../../services/storage.service';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';

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
    selector: 'app-rfq-details-show',
    templateUrl: './rfq-details-show.component.html',
    styleUrls: ['./rfq-details-show.component.scss'],
    providers: [
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
        },

        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ],
})
export class RfqDetailsShowComponent implements OnDestroy {

    breadcrumb: Breadcrumb[];
    minDate = moment();
    procurementDetails;
    show_alert = true;
    delivary_start_date: any;
    delivary_end_date: any;
    deliveryTimelineObj;
    generalInformation: FormGroup;
    updateDescription: FormGroup;
    participants: { key: number; value: string }[];
    can_edit;

    constructor(private activatedRoute: ActivatedRoute,
                private dashboardSharedService: DashboardSharedService,
                private dialog: MatDialog,
                private fb: FormBuilder,
                private pop: PopAlertService,
                private http: ShebaHttpService,
                private storage: StorageService) {
        const rfqId = activatedRoute.snapshot.parent.parent.params.id;
        this.initializeBreadCrumb(rfqId);
        this.dashboardSharedService.changeBreadcrumb(true, this.breadcrumb);

        this.activatedRoute.data.subscribe(res => {
            this.procurementDetails = res.rfqDetails.procurement;
            this.participants = res.rfqDetails.number_of_participants;
            this.generalInformation = this.fb.group({
                payment_option: new FormControl(this.procurementDetails.payment_options, Validators.required),
                lastDateOfSubmission: new FormControl(this.getDate(this.procurementDetails.last_date_of_submission), Validators.required),
                number_of_participants: new FormControl(this.procurementDetails.number_of_participants, Validators.required)
            });
            this.deliveryTimelineObj = {
                startDate: new Date(this.getDate(this.procurementDetails.start_date)),
                endDate: new Date(this.getDate(this.procurementDetails.end_date))
            };
            this.updateDescription = this.fb.group({
                description: new FormControl(this.procurementDetails.long_description, Validators.required)
            });
            this.setEditStatus();
        });
    }

    getDate(date) {
        const dateString = this.formatDate(date);
        const momentObj = moment(dateString, 'MM-DD-YYYY');
        const momentString = momentObj.format('YYYY-MM-DD');
        return momentString;
    }

    formatDate(date) {
        const res = date.split('/');
        return [res[1], res[0], res[2]].join('-');
    }

    setEditStatus() {
        this.can_edit = this.procurementDetails.status === 'Draft';
    }

    initializeBreadCrumb(rfqId) {
        this.breadcrumb = [
            {
                title: 'List',
                path: '/dashboard/rfq/list'
            },
            {
                title: 'Tender Details',
                path: `/dashboard/rfq/list/${rfqId}/details`
            },
            {
                title: 'Details',
                isActive: true
            }
        ];
    }

    downloadAttachment(link) {
        window.open(link, '_blank');
    }

    submit(event) {
        event.preventDefault();
        const data = this.generalInformation.getRawValue();
        const formatLastDateOfSubmission = moment(data.lastDateOfSubmission).format('YYYY-MM-DD');
        const postData = {
            number_of_participants: data.number_of_participants ? data.number_of_participants : 0,
            last_date_of_submission: formatLastDateOfSubmission,
            procurement_start_date: this.delivary_start_date ? this.delivary_start_date : this.getDate(this.procurementDetails.start_date),
            procurement_end_date: this.delivary_end_date ? this.delivary_end_date : this.getDate(this.procurementDetails.end_date),
            payment_options: data.payment_option
        };
        this.postEditApi(postData);
    }

    editDescription(event) {
        event.preventDefault();
        const data = this.updateDescription.getRawValue();
        const description = data.description;
        if (description) {
            if (description.length > 20) {
                const postData = {
                    description: data.description
                };
                this.postEditApi(postData);
            } else {
                this.pop.open('Description Must Be 20 Characters long');
            }
        } else {
            this.pop.open('Description is required');
        }
    }

    postEditApi(data) {
        const url = 'v2/businesses/' + this.storage.user.business_id + '/procurements/' + this.procurementDetails.id + '/general';
        this.http.post(url, data).toPromise().then(res => {
            if (res.code === 200) {
                this.pop.open('Data Updated Successfully');
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else {
                this.pop.open('Something Went Wrong');
            }
        });
    }

    handleDeliveryTimeline(event: any) {
        console.log(event);
        this.delivary_start_date = moment(event.startDate).format('YYYY-MM-DD');
        this.delivary_end_date = moment(event.endDate).format('YYYY-MM-DD');
    }

    ngOnDestroy() {
        this.dashboardSharedService.changeBreadcrumb(false);
    }

}
