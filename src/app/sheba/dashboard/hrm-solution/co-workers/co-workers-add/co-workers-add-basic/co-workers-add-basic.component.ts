import {Component, OnDestroy} from '@angular/core';
import {MatDialog} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CoWorkersAddService} from '../../co-workers-services/co-workers-add.service';
import {DialogCoWorkersBasicConfirmComponent} from '../../modals/dialog-co-workers-basic-confirm/dialog-co-workers-basic-confirm.component';
import {IDepartment, IEmployee} from '../../../../../../types/users';
import {PopAlertService} from '../../../../../../modules/pop-alert/pop-alert.service';
import {CoWorkerStorageService} from '../../../../../../services/co-workers-storage-service/co-worker-storage.service';
import {BasicInfo} from '../../../../../../types/co-workers';
import {CoWorkersSharedService} from '../../co-workers-services/co-workers-shared.service';
import {delay} from 'rxjs/operators';

@Component({
    selector: 'app-co-workers-add-basic',
    templateUrl: './co-workers-add-basic.component.html',
    styleUrls: ['./co-workers-add-basic.component.scss']
})

export class CoWorkersAddBasicComponent implements OnDestroy {

    imgURL: any;
    public message: string;

    basicInfoForm: FormGroup;
    basicInfoDataFromApi: BasicInfo;

    departments: IDepartment[];
    managers: IEmployee[];

    showError = false;
    isSaving = false;

    confirmationDialogRef;

    coworkerId;
    currentStatus = 'add'; // Deciding whether add or update api should be called

    constructor(private pop: PopAlertService,
                private router: Router,
                private dialog: MatDialog,
                private formBuilder: FormBuilder,
                private activatedRoute: ActivatedRoute,
                private coWorkersStorageService: CoWorkerStorageService,
                private coWorkersSharedService: CoWorkersSharedService,
                private coWorkersAddService: CoWorkersAddService) {
        this.coworkerId = this.coWorkersStorageService.CoworkerId;

        activatedRoute.parent.data.subscribe(({ coworkersAdd }) => {
            if (coworkersAdd && coworkersAdd.basic_info) {
                this.basicInfoDataFromApi = coworkersAdd.basic_info;
                this.imgURL = coworkersAdd.basic_info.profile.profile_picture;
                this.currentStatus = 'update';
            }
        });

        activatedRoute.data.subscribe(({ coworkersBasic }) => {
            this.DepartmentsList = coworkersBasic.departments;
            this.CoworkersList = coworkersBasic.employees;
        });

        this.constructBasicInfoForm();
    }

    get basicInfoFormControls() {
        return this.basicInfoForm.controls;
    }

    set CoworkersList(managers: IEmployee[]) {
        this.managers = managers;
    }

    set DepartmentsList(departmentsList: IDepartment[]) {
        this.departments = departmentsList;
    }

    constructBasicInfoForm() {
        this.basicInfoForm = this.formBuilder.group({
            pro_pic: [ this.basicInfoDataFromApi ? this.basicInfoDataFromApi.profile.profile_picture : null ],
            first_name: [ this.basicInfoDataFromApi ? this.basicInfoDataFromApi.profile.name : null , Validators.required ],
            email: [ this.basicInfoDataFromApi ? this.basicInfoDataFromApi.profile.email : null, [Validators.required, Validators.email ] ],
            department: [ this.basicInfoDataFromApi ? this.basicInfoDataFromApi.department_id : null, Validators.required ],
            role: [ this.basicInfoDataFromApi ? this.basicInfoDataFromApi.designation : null, Validators.required ],
            manager_employee: [ this.basicInfoDataFromApi ? this.basicInfoDataFromApi.manager_detail && this.basicInfoDataFromApi.manager_detail.business_member : null ]
        });
    }

    selectEmployeePhoto(event) {
        const files: FileList = event.target.files;

        if (files.length === 0) {
            return;
        }

        const isValidImage = this.checkFileType(files[0].type);

        if (isValidImage) {
            this.basicInfoForm.controls['pro_pic'].setValue(files[0]);

            const reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onload = () => this.imgURL = reader.result;
        }
    }

    checkFileType(fileType) {
        const pattern = /image\/*/;

        if (!fileType.match(pattern)) {
            this.pop.open('Employee photo must be an image');
            return false;
        }
        return true;
    }

    submitBasicInfo() {
        if (this.basicInfoForm.invalid) {
            this.showError = true;
            return;
        }

        this.isSaving = true;

        if (this.currentStatus === 'add') {
            const constructedData =  this.constructBasicInfoDataForAdd(this.basicInfoForm.value);
            const appendedFormData = this.appendBasicInfoIntoForm(constructedData);
            this.postToAddApi(appendedFormData);
        }

        if (this.currentStatus === 'update') {
            const appendedFormData = this.appendBasicInfoIntoForm(this.basicInfoForm.value);
            this.postToUpdateApi(appendedFormData);
        }

    }

    constructBasicInfoDataForAdd(basicInfo) {
        const pro_pic = basicInfo.pro_pic ? basicInfo.pro_pic : null;
        const first_name = basicInfo.first_name;
        const email = basicInfo.email;
        const department =  basicInfo.department;
        const role =  basicInfo.role;
        const manager_employee =  basicInfo.manager_employee ? basicInfo.manager_employee : null;

        return Object.assign({},
            pro_pic && {pro_pic},
            {first_name},
            {email},
            {department},
            {role},
            manager_employee && {manager_employee}
        );
    }

    appendBasicInfoIntoForm(basicInfo) {
        const formData = new FormData();

        for (const key of Object.keys(basicInfo)) {
            formData.append(key, basicInfo[key] ? basicInfo[key] : null);
        }

        return formData;
    }

    postToAddApi(data) {
        this.coWorkersAddService.addBasicInformation(data).pipe(delay(1000)).subscribe(
            res => {
                this.isSaving = false;
                if (res.code === 200) {
                    this.storeCoworkerIdIntoSessionStorage(res.member_id);
                    this.openSuccessModal();
                    this.updateProfileCompletionScore('add');
                    return;
                }
                this.openErrorDialog(res.message);
            },
            (error) => {
                this.isSaving = false;
                this.openErrorDialog(error.message);
            }
        );
    }

    postToUpdateApi(data) {
        this.coWorkersAddService.updateBasicInformation(this.coworkerId, data).pipe(delay(1000)).subscribe(
            res => {
                this.isSaving = false;
                if (res.code === 200) {
                    this.successfulMessage();
                    this.updateProfileCompletionScore('add');
                    return;
                }
                this.openErrorDialog(res.message);
            },
            (error) => {
                this.isSaving = false;
                this.openErrorDialog(error.message);
            }
        );
    }

    storeCoworkerIdIntoSessionStorage(coworkerId) {
        this.coWorkersStorageService.CoworkerId = coworkerId;
    }

    updateProfileCompletionScore(addOrRemoveScore: string) {
        this.coWorkersSharedService.updateCoworkerProfileCompletionScore(addOrRemoveScore);
    }

    openSuccessModal() {
        this.confirmationDialogRef = this.dialog.open(DialogCoWorkersBasicConfirmComponent, {
            data: {
                type: 'success',
                title: 'Added Successfully',
                text: 'Co-worker has been added in co-worker list. You can add other necessary information to complete co-worker profile'
            },
            width: '540px',
            height: 'auto'
        });

        this.dialogButtonActions();
    }

    openErrorDialog(message) {
        this.confirmationDialogRef = this.dialog.open(DialogCoWorkersBasicConfirmComponent, {
            data: {
                type: 'failure',
                title: 'Email already exist!',
                text: message
            },
            width: '540px',
            height: 'auto'
        });

        this.dialogButtonActions();
    }

    dialogButtonActions() {
        const dialogSubscription = this.confirmationDialogRef.componentInstance.onCompleteOrAdd.subscribe((type) => {
            if (type === 'complete') {
                this.router.navigate(['/', 'dashboard', 'co-workers', 'add', 'official']).then();
            }
            if (type === 'another') {
                this.resetBasicInfoForm();
                this.resetCoWorkerIdInStorage();
                this.updateProfileCompletionScore('remove');
            }
            if (type === 'try-again') {
                this.submitBasicInfo();
            }
            this.confirmationDialogRef.close();
        });

        // Unsubscribing
        this.confirmationDialogRef.afterClosed().subscribe(() => dialogSubscription.unsubscribe());
    }

    resetBasicInfoForm() {
        this.basicInfoForm.reset();
        this.imgURL = null;
    }

    resetCoWorkerIdInStorage() {
        this.coWorkersStorageService.CoworkerId = null;
    }

    successfulMessage() {
        const message = `Basic Information Updated Successfully`;
        this.coWorkersSharedService.changeCurrentConfirmationStatus(true, true, message);
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
