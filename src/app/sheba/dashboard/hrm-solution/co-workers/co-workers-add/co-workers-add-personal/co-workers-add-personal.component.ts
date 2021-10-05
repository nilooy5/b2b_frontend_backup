import {Component, OnDestroy} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoWorkersAddService } from '../../co-workers-services/co-workers-add.service';
import { CoWorkersSharedService } from '../../co-workers-services/co-workers-shared.service';
import {ActivatedRoute} from '@angular/router';
import {PersonalInfo} from '../../../../../../types/co-workers';
import * as moment from 'moment';
import {CoWorkerStorageService} from '../../../../../../services/co-workers-storage-service/co-worker-storage.service';

@Component({
    selector: 'app-co-workers-add-personal',
    templateUrl: './co-workers-add-personal.component.html',
    styleUrls: ['./co-workers-add-personal.component.scss']
})

export class CoWorkersAddPersonalComponent implements OnDestroy {

    personalInfoForm: FormGroup;

    isSaving = false;

    personalInfoDataFromApi: PersonalInfo;

    coworkerId: string|number;

    nidFrontAttachment;
    nidFrontAttachmentName = null;

    nidBackAttachment;
    nidBackAttachmentName = null;

    constructor(private formBuilder: FormBuilder,
                private activatedRoute: ActivatedRoute,
                private coWorkersAddService: CoWorkersAddService,
                private coWorkerStorageService: CoWorkerStorageService,
                private coWorkersSharedService: CoWorkersSharedService) {

        this.coworkerId = this.coWorkerStorageService.CoworkerId;

        activatedRoute.parent.data.subscribe(({ coworkersAdd }) => {
            if (coworkersAdd && coworkersAdd.personal_info) {
                this.personalInfoDataFromApi = coworkersAdd.personal_info;
                this.nidFrontAttachment = coworkersAdd.personal_info.nid_image_front;
                this.nidFrontAttachmentName = coworkersAdd.personal_info.nid_image_front_name;
                this.nidBackAttachment = coworkersAdd.personal_info.nid_image_back;
                this.nidBackAttachmentName = coworkersAdd.personal_info.nid_image_back_name;
            }
        });

        this.constructPersonalInfoForm();
    }

    constructPersonalInfoForm() {
        console.log(this.personalInfoDataFromApi);
        this.personalInfoForm = this.formBuilder.group({
            mobile: [ this.personalInfoDataFromApi && this.personalInfoDataFromApi.mobile ? this.checkValidPhoneNumber(this.personalInfoDataFromApi.mobile) : null , Validators.pattern('^01\\d{9}$') ],
            date_of_birth: [ this.personalInfoDataFromApi && this.personalInfoDataFromApi.date_of_birth ? moment(this.personalInfoDataFromApi.date_of_birth) : null ],
            address: [ this.personalInfoDataFromApi && this.personalInfoDataFromApi.address ? this.personalInfoDataFromApi.address : null ],
            nationality: [ this.personalInfoDataFromApi && this.personalInfoDataFromApi.nationality ? this.personalInfoDataFromApi.nationality : null ],
            nid_number: [ this.personalInfoDataFromApi && this.personalInfoDataFromApi.nid_no ? this.personalInfoDataFromApi.nid_no : null ]
        });
    }

    get personalInfoFormControls() {
        return this.personalInfoForm.controls;
    }

    checkValidPhoneNumber(phone) {
        return phone && phone.startsWith('+88') ? phone.slice(3) : phone;
    }

    selectNidAttachment(event, type: string) {
        const files: FileList = event.target.files;

        if (files.length === 0) {
            return;
        }

        if (type === 'front') {
            this.nidFrontAttachment = files[0];
            this.nidFrontAttachmentName = files[0].name;
        }

        if (type === 'back') {
            this.nidBackAttachment = files[0];
            this.nidBackAttachmentName = files[0].name;
        }
    }

    submitPersonalInformation() {
        if (this.personalInfoForm.invalid) {
            return;
        }

        this.isSaving = true;
        const personalInfoFormData = this.constructPersonInfoFormData(this.personalInfoForm.value);
        const appendedFormData = this.appendPersonalInfoIntoForm(personalInfoFormData);
        this.postToApi(appendedFormData);
    }

    constructPersonInfoFormData(personalInfo) {
        return {
            ...personalInfo,
            date_of_birth: personalInfo.date_of_birth && personalInfo.date_of_birth.format('YYYY-MM-DD'),
            nid_front: this.nidFrontAttachment,
            nid_back: this.nidBackAttachment,
        };
    }

    appendPersonalInfoIntoForm(personalInfo) {
        const formData = new FormData();

        for (const key of Object.keys(personalInfo)) {
            formData.append(key, personalInfo[key] ? personalInfo[key] : null);
        }

        return formData;
    }

    postToApi(data) {
        this.coWorkersAddService.updatePersonalInformation(this.coworkerId, data).subscribe(
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
        const message = 'Personal Information Saved Successfully';
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
