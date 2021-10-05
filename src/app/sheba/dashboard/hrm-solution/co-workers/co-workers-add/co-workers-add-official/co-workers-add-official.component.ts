import {Component, OnDestroy} from '@angular/core';
import { PopAlertService } from '../../../../../../modules/pop-alert/pop-alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CoWorkersAddService } from '../../co-workers-services/co-workers-add.service';
import { CoWorkersSharedService } from '../../co-workers-services/co-workers-shared.service';
import {EmergencyInfo, OfficialInfo} from '../../../../../../types/co-workers';
import {CoWorkerStorageService} from '../../../../../../services/co-workers-storage-service/co-worker-storage.service';
import * as moment from 'moment';

@Component({
    selector: 'app-co-workers-add-official',
    templateUrl: './co-workers-add-official.component.html',
    styleUrls: ['./co-workers-add-official.component.scss']
})

export class CoWorkersAddOfficialComponent implements OnDestroy  {

    officialInfoForm: FormGroup;

    isSaving = false;

    employeeTypes = [
        {
            key: 'permanent',
            value: 'Permanent'
        },
        {
            key: 'on_probation',
            value: 'On Probation'
        },
        {
            key: 'contractual',
            value: 'Contractual'
        },
        {
            key: 'intern',
            value: 'Intern'
        }
    ];

    officialInfoDataFromApi: OfficialInfo;
    coworkerId;

    constructor(private pop: PopAlertService,
                private router: Router,
                private dialog: MatDialog,
                private formBuilder: FormBuilder,
                private activatedRoute: ActivatedRoute,
                private coWorkersAddService: CoWorkersAddService,
                private coWorkerStorageService: CoWorkerStorageService,
                private coWorkersSharedService: CoWorkersSharedService) {

        this.coworkerId = this.coWorkerStorageService.CoworkerId;

        activatedRoute.parent.data.subscribe(({ coworkersAdd }) => {
            if (coworkersAdd && coworkersAdd.official_info) {
                this.officialInfoDataFromApi = coworkersAdd.official_info;
            }
        });

        this.constructOfficialInfo();
    }

    constructOfficialInfo() {
        this.officialInfoForm = this.formBuilder.group({
            join_date: [ this.officialInfoDataFromApi ? moment(this.officialInfoDataFromApi.join_date) : null],
            grade: [ this.officialInfoDataFromApi ? this.officialInfoDataFromApi.grade : null],
            employee_type: [ this.officialInfoDataFromApi ? this.officialInfoDataFromApi.employee_type : null],
            previous_institution: [ this.officialInfoDataFromApi ? this.officialInfoDataFromApi.previous_institution : null],
        });
    }

    submitOfficialInformation() {
        this.isSaving = true;
        const formData = {
            ...this.officialInfoForm.value,
            join_date: this.officialInfoForm.value.join_date && this.officialInfoForm.value.join_date.format('YYYY-MM-DD')
        };
        const appendedFormData = this.appendOfficialInfoIntoForm(formData);
        this.postToApi(appendedFormData);
    }

    appendOfficialInfoIntoForm(officialInfoForm) {
        const formData = new FormData();

        for (const key of Object.keys(officialInfoForm)) {
            formData.append(key, officialInfoForm[key] ? officialInfoForm[key] : null);
        }

        return formData;
    }

    postToApi(data) {
        this.coWorkersAddService.updateOfficialInformation(this.coworkerId, data).subscribe(
            res => {
                this.isSaving = false;
                if (res.code === 200) {
                    this.successfulMessage();
                    this.updateProfileCompletionScore('add');
                    return;
                }
                this.errorMessage(res.message);
            },
            (error) => {
                this.isSaving = false;
                this.errorMessage(error.message);
            }
        );
    }

    successfulMessage() {
        const message = 'Official Information Saved Successfully';
        this.coWorkersSharedService.changeCurrentConfirmationStatus(true, true, message);
        this.hideMessage();
    }

    updateProfileCompletionScore(addOrRemoveScore: string) {
        this.coWorkersSharedService.updateCoworkerProfileCompletionScore(addOrRemoveScore);
    }

    errorMessage(message) {
        this.coWorkersSharedService.changeCurrentConfirmationStatus(true, false, message);
        this.hideMessage();
    }

    hideMessage() {
        setTimeout(() => {
            this.coWorkersSharedService.changeCurrentConfirmationStatus(false );
        }, 5000);
    }

    ngOnDestroy() {
        this.coWorkersSharedService.changeCurrentConfirmationStatus(false);
    }
}
