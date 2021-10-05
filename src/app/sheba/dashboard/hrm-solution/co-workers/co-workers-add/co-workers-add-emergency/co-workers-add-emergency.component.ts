import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CoWorkersAddService} from '../../co-workers-services/co-workers-add.service';
import {CoWorkersSharedService} from '../../co-workers-services/co-workers-shared.service';
import {checkAllPropertiesAreNull} from '../../../../../../helpers/functions';
import {CoWorkerStorageService} from '../../../../../../services/co-workers-storage-service/co-worker-storage.service';
import {ActivateRoutes} from '@angular/router/src/operators/activate_routes';
import {ActivatedRoute} from '@angular/router';
import {EmergencyInfo} from '../../../../../../types/co-workers';

@Component({
    selector: 'app-co-workers-add-emergency',
    templateUrl: './co-workers-add-emergency.component.html',
    styleUrls: ['./co-workers-add-emergency.component.scss']
})

export class CoWorkersAddEmergencyComponent implements OnDestroy {

    isSaving = false;
    emergencyInfoDataFromApi: EmergencyInfo;
    coworkerId;
    emergencyInfoForm: FormGroup;

    constructor(private formBuilder: FormBuilder,
                private coWorkersAddService: CoWorkersAddService,
                private activatedRoute: ActivatedRoute,
                private coWorkerStorageService: CoWorkerStorageService,
                private coWorkersSharedService: CoWorkersSharedService) {

        this.coworkerId = this.coWorkerStorageService.CoworkerId;

        activatedRoute.parent.data.subscribe(({ coworkersAdd }) => {
            if (coworkersAdd && coworkersAdd.emergency_info) {
                this.emergencyInfoDataFromApi = coworkersAdd.emergency_info;
            }
        });

        this.constructEmergencyInfoForm();
    }

    constructEmergencyInfoForm() {
        this.emergencyInfoForm = this.formBuilder.group({
            name: [ this.emergencyInfoDataFromApi ? this.emergencyInfoDataFromApi.emergency_contract_person_name : null ],
            mobile: [  this.emergencyInfoDataFromApi ? this.checkValidPhoneNumber(this.emergencyInfoDataFromApi.emergency_contract_person_number) : null, Validators.pattern('^01\\d{9}$')],
            relationship: [  this.emergencyInfoDataFromApi ? this.emergencyInfoDataFromApi.emergency_contract_person_relationship : null ]
        });
    }

    checkValidPhoneNumber(phone) {
        return phone && phone.startsWith('+88') ? phone.slice(3) : phone;
    }

    get emergencyInfoFormControls() {
        return this.emergencyInfoForm.controls;
    }

    submitEmergencyInfo() {
        if (this.emergencyInfoForm.invalid) {
            return;
        }

        this.isSaving = true;
        const appendedFormData = this.appendEmergencyInfoIntoForm(this.emergencyInfoForm.value);
        this.postToApi(appendedFormData);

        // this.isAllPropertiesNull = checkAllPropertiesAreNull(this.emergencyInfoForm.value);
        //
        // if (this.emergencyInfoForm.valid) {
        //     this.isSaving = true;
        //     const data = {
        //         name: this.emergencyInfoForm.value.name ? this.emergencyInfoForm.value.name : null,
        //         mobile: this.emergencyInfoForm.value.mobile ? this.emergencyInfoForm.value.mobile : null,
        //         relationship: this.emergencyInfoForm.value.relationship ? this.emergencyInfoForm.value.relationship : null,
        //     };
        //     this.postToApi(data);
        // }
    }

    appendEmergencyInfoIntoForm(emergencyInfoForm) {
        const formData = new FormData();

        for (const key of Object.keys(emergencyInfoForm)) {
            formData.append(key, emergencyInfoForm[key] ? emergencyInfoForm[key] : null);
        }

        return formData;
    }

    postToApi(data) {
        this.coWorkersAddService.updateEmergencyInformation(this.coworkerId, data).subscribe(
            (res) => {
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
        const message = `Emergency Information Saved Successfully`;
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
