import {Component, OnInit, ViewChildren, AfterViewInit, EventEmitter, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PopAlertService } from '../../../../../../modules/pop-alert/pop-alert.service';
import { RfqStorageService } from '../../../../../../services/rfq-storage-service/rfq-storage.service';
import { RfqCreateSharedService } from '../../../rfq-services/rfq-create-services/rfq-create-shared.service';
import { RfqValidation } from '../../../../../../types/rfq';


@Component({
    selector: 'app-rfq-create-basic-info',
    templateUrl: './rfq-create-basic-info.component.html',
    styleUrls: ['./rfq-create-basic-info.component.scss']
})

export class RfqCreateBasicInfoComponent implements OnInit, AfterViewInit {

    @ViewChildren('rfqDescription') rfqDescriptionViewChild;

    showTitleInput = false;
    showBudgetInput = false;
    showTagsInput = false;

    isTitleValid: boolean;
    isTitleTouched = true;
    isDescriptionValid: boolean;
    isDescriptionTouched = true;
    isBudgetValid: boolean;
    isBudgetTouched = true;
    isTagsValid: boolean;
    isTagsTouched = true;

    basicInfoForm: FormGroup;



    @Output() showScoreBoard = new EventEmitter();

    constructor(private pop: PopAlertService,
                private formBuilder: FormBuilder,
                private rfqCreateSharedService: RfqCreateSharedService,
                private rfqStorageService: RfqStorageService) {

        this.constructBasicInformationForm();

        this.showTitleInput = !!(this.rfqStorageService.BasicInformation && this.rfqStorageService.BasicInformation.title);
        this.showBudgetInput = !!(this.rfqStorageService.BasicInformation && this.rfqStorageService.BasicInformation.budget);
        this.showTagsInput = !!(this.rfqStorageService.BasicInformation && this.rfqStorageService.BasicInformation.tags.length);

        this.validationCheckFromStorage();

    }

    ngOnInit() {
        this.watchBasicInfoFormChanges();

        this.rfqStorageService.RfqValidation.hasDescription
            ? this.rfqCreateSharedService.changeJourneyValidationStatus('valid')
            : this.rfqCreateSharedService.changeJourneyValidationStatus('invalid');
    }

    ngAfterViewInit() {
        if (this.rfqDescriptionViewChild.first.nativeElement.value !== '') {
            this.rfqDescriptionViewChild.first.nativeElement.focus();
        }
    }

    watchBasicInfoFormChanges() {
        this.basicInfoForm.valueChanges.subscribe((res) => {
            this.rfqStorageService.BasicInformation = res;
            this.rfqStorageService.RfqValidation = this.findValidControls();
            // this.rfqCreateSharedService.changeBasicInfoValidationStatus(validStatus);
        });
    }

    constructBasicInformationForm() {
        const basicInformationData = this.rfqStorageService.BasicInformation;

        this.basicInfoForm = this.formBuilder.group({
            title: [basicInformationData ? basicInformationData.title : null, [Validators.required, Validators.minLength(10)]],
            description: [basicInformationData ? basicInformationData.description : null, [Validators.required, Validators.minLength(20)]],
            budget: [basicInformationData ? basicInformationData.budget : null, Validators.required],
            tags: [basicInformationData ? basicInformationData.tags : [], Validators.required]
        });

    }

    validationCheckFromStorage() {
        this.isTitleValid = this.rfqStorageService.RfqValidation.hasTitle;
        this.isDescriptionValid = this.rfqStorageService.RfqValidation.hasDescription;
        this.isBudgetValid = this.rfqStorageService.RfqValidation.hasBudget;
        this.isTagsValid = this.rfqStorageService.RfqValidation.hasTags;
    }

    findValidControls(): RfqValidation {
        const validFormControls: RfqValidation = {};
        const mapBasicFormControls = {
            title: 'hasTitle',
            description: 'hasDescription',
            budget: 'hasBudget',
            tags: 'hasTags'
        };
        const controls = this.basicInfoForm.controls;
        Object.keys(controls).forEach((key) => {
            validFormControls[mapBasicFormControls[key]] = controls[key].valid;
        });
        return validFormControls;
    }

    showInput(type: string) {
        if (type === 'title') {
            this.showTitleInput = true;
        }
        if (type === 'budget') {
            this.showBudgetInput = true;
        }
        if (type === 'tags') {
            this.showTagsInput = true;
        }
    }

    receivedTags(event: string[]) {
        // this.validation('tags', event, 1, this.isTagsValid);
        this.checkTagsValidation('tags', event);
        this.basicInfoForm.controls['tags'].setValue(event);
        // console.log(event);
    }

    onChangeInput(event: Event) {
        const { name, value } = event.target as HTMLInputElement;

        if (name === 'title') {
            this.checkTitleValidation(name, value);
            // this.validation({name: target.name, value: target.value, requiredLength: 10, validFlag: this.isTitleValid});
        }

        if (name === 'description') {
            this.checkDescriptionValidation(name, value);
            // this.validation({name: target.name, value: target.value, requiredLength: 30, validFlag: this.isDescriptionValid});
            // this.validation(target.name, target.value, 30, this.isDescriptionValid);
        }

        if (name === 'budget') {
            this.checkBudgetValidation(name, value);
            // this.validation({name: target.name, value: target.value, requiredLength: 1, validFlag: this.isBudgetValid});
            // this.validation(target.name, target.value, 1, this.isBudgetValid);
        }
    }

    checkTitleValidation(name, value) {
        if (value && this.isTitleTouched === true) {
            this.showScoreBoard.emit();
        }
        if (value.length >= 10 && this.isTitleValid === false) {
            this.isTitleTouched = false;
            this.isTitleValid = true;
            this.rfqCreateSharedService.changeBasicInfoValidationStatus({ name, isValid: true });
        }
        if (value.length < 10 && this.isTitleValid === true) {
            this.isTitleValid = false;
            this.rfqCreateSharedService.changeBasicInfoValidationStatus({ name, isValid: false });
        }
    }

    checkDescriptionValidation(name, value) {
        if (value && this.isDescriptionTouched === true) {
            this.showScoreBoard.emit();
        }
        if (value.length >= 20 && this.isDescriptionValid === false) {
            this.isDescriptionValid = true;
            this.isDescriptionTouched = false;
            this.rfqCreateSharedService.changeJourneyValidationStatus('valid');
            this.rfqCreateSharedService.changeBasicInfoValidationStatus({ name, isValid: true });
        }
        if (value.length < 20 && this.isDescriptionValid === true) {
            this.isDescriptionValid = false;
            this.rfqCreateSharedService.changeJourneyValidationStatus('invalid');
            this.rfqCreateSharedService.changeBasicInfoValidationStatus({ name, isValid: false });
        }
    }

    checkBudgetValidation(name, value) {
        if (value && this.isBudgetTouched === true) {
            this.showScoreBoard.emit();
        }
        if (value.length >= 1 && this.isBudgetValid === false) {
            this.isBudgetTouched = false;
            this.isBudgetValid = true;
            this.rfqCreateSharedService.changeBasicInfoValidationStatus({ name, isValid: true });
        }
        if (value.length < 1 && this.isBudgetValid === true) {
            this.isBudgetValid = false;
            this.rfqCreateSharedService.changeBasicInfoValidationStatus({ name, isValid: false });
        }
    }

    checkTagsValidation(name, value) {
        if (value && this.isTagsTouched === true) {
            this.showScoreBoard.emit();
        }
        if (value.length >= 1 && this.isTagsValid === false) {
            this.isTagsTouched = false;
            this.isTagsValid = true;
            this.rfqCreateSharedService.changeBasicInfoValidationStatus({ name, isValid: true });
        }
        if (value.length < 1 && this.isTagsValid === true) {
            this.isTagsValid = false;
            this.rfqCreateSharedService.changeBasicInfoValidationStatus({ name, isValid: false });
        }
    }

    get fc() {
        return this.basicInfoForm.controls;
    }

    // validation({name, value, requiredLength, validFlag}) {
    //     if (value.length === requiredLength && validFlag === false) {
    //         console.log('its false');
    //         validFlag = true;
    //         this.rfqCreteDataService.changeBasicInfoValidationStatus({ name, isValid: validFlag });
    //     }
    //     if (value.length < requiredLength && validFlag === true) {
    //         console.log('its true');
    //         validFlag = false;
    //         this.rfqCreteDataService.changeBasicInfoValidationStatus({ name, isValid: validFlag });
    //     }
    //     console.log(name, validFlag, this.isBudgetValid);
    // }
}
