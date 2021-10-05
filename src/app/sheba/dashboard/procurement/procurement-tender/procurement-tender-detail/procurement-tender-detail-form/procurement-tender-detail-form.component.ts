import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {StorageService} from '../../../../../../services/storage.service';
import {ShebaHttpService} from '../../../../../../modules/sheba-http/sheba-http.service';
import {PopAlertService} from '../../../../../../modules/pop-alert/pop-alert.service';
import {DatePipe} from '@angular/common';
import {ProcurementTenderDetailSharedService} from '../procurement-tender-detail-shared.service';
import {migrateLegacyGlobalConfig} from '@angular/cli/utilities/config';

@Component({
    selector: 'app-procurement-tender-detail-form',
    templateUrl: './procurement-tender-detail-form.component.html',
    styleUrls: ['./procurement-tender-detail-form.component.scss'],
    providers: [DatePipe]
})
export class ProcurementTenderDetailFormComponent implements OnInit {


    displayedColumns = ['serialNo', 'itemName', 'specification', 'unit'];
    otherInformationFormEnable = false;
    otherInformation: FormGroup;

    labels;
    isRFQPublished;
    procurementDetails;
    priceQuotationDataSource;
    technicalEvaluationQuestions;
    companyEvaluationQuestions;


    constructor(private storage: StorageService,
                private http: ShebaHttpService,
                private route: ActivatedRoute,
                private pop: PopAlertService,
                private formBuilder: FormBuilder,
                private datePipe: DatePipe,
                private sharedService: ProcurementTenderDetailSharedService) {

        this.route.data.subscribe(res => {
            console.log(res);
            this.procurementDetails = res.procurementDetails;

            this.isRFQPublished = this.procurementDetails.published_at;

            this.otherInformation = this.formBuilder.group({
                numberOfParticipate: [this.procurementDetails.number_of_participants, Validators.required],
                lastDateOfSubmission: [this.procurementDetails.last_date_of_submission, Validators.required],
            });

        });

        // this.sharedService.procurementDetails.subscribe(res => {
        //     this.procurementDetails = res;
        // });

    }


    ngOnInit() {
        if (this.procurementDetails.price_quotation) {
            this.priceQuotationDataSource = this.procurementDetails.price_quotation.map(item => {
                return {
                    itemName: item.title,
                    specification: item.short_description,
                    unit: JSON.parse(item.variables).unit
                };
            });
        }

        if (this.procurementDetails.technical_evaluation) {
            this.technicalEvaluationQuestions = this.procurementDetails.technical_evaluation.map(item => {
                return {
                    title: item.title,
                    input_type: item.input_type,
                    options: JSON.parse(item.variables).options
                };
            });
        }

        if (this.procurementDetails.company_evaluation) {
            this.companyEvaluationQuestions = this.procurementDetails.company_evaluation.map(item => {
                return {
                    title: item.title,
                    input_type: item.input_type,
                    options: JSON.parse(item.variables).options
                };
            });
        }


        console.log(this.procurementDetails.labels);
        if (this.procurementDetails.labels.length > 0) {
            this.labels = JSON.parse(this.procurementDetails.labels);
        }




        console.log(this.otherInformation.getRawValue());
    }

    get fc() {
        return this.otherInformation.controls;
    }

    onSubmitOtherInformation() {
        if (this.otherInformation.valid) {
            const data = this.otherInformation.getRawValue();
            const submitData = {
                number_of_participants: data.numberOfParticipate,
                last_date_of_submission: this.datePipe.transform(data.lastDateOfSubmission, 'yyyy-MM-dd')
            };

            this.http.post('/v2/businesses/' + this.storage.user.business_id + '/procurements/' + this.procurementDetails.id + '/general', submitData).toPromise().then(res => {
                if (res.code === 200) {
                    this.pop.open(res.message);
                    this.otherInformationFormEnable = false;
                } else {
                    this.pop.open(res.message);
                }
            }).catch(err => {
                this.pop.open(err.message);
            });
        } else {
            this.pop.open('Form Not Valid');
        }
    }

    viewImage(file) {
        const newTab = window.open();
        newTab.document.body.innerHTML = '<img src=\"' + file + '\" alt="" />';
    }

    limitString(str) {
        return (str && str.length > 30) ? str.slice(0, 30) + '..' : str;
    }


}
