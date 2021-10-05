import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Tender} from '../../../../../../../models/tender';
import {TenderService} from '../../../../../../../services/tender-service/tender.service';
import {IDateRange} from '../../../../../../../modules/date-range-picker/date-range';
import '../../../../../../../helpers/extends';
import {ProcurementFormValidationService} from '../../procurement-form-validation.service';
import { Subscription } from 'rxjs';
import {PopAlertService} from '../../../../../../../modules/pop-alert/pop-alert.service';
import {FileUploader} from 'ng2-file-upload/ng2-file-upload';

export interface Label {
    name: string;
}

@Component({
    selector: 'app-procurement-tender-add-general',
    templateUrl: './procurement-tender-add-general.component.html',
    styleUrls: ['./procurement-tender-add-general.component.scss'],
    encapsulation: ViewEncapsulation.Emulated
})

export class ProcurementTenderAddGeneralComponent implements OnInit, OnDestroy {

    form: FormGroup;
    selectedRadioButton;
    paymentOptions: Array<string>;
    rfqTypes: any;
    advancedRFQForms: any;
    selectedPaymentOption: string;
    deliveryDateRange: IDateRange;
    savedLabels: Array<string>;
    hasErrorOnNewPaymentMethod = false;
    private subscription: Subscription;
    // labels: any[] = [];

    /* Angular Chips Configuration */
    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = true;
    readonly separatorKeysCodes: number[] = [ENTER, COMMA];
    labels: Label[] = [];
    showError = false;

    public uploader: FileUploader;
    encodedFiles = [];

    constructor(
        private formBuilder: FormBuilder,
        private tenderService: TenderService,
        private procurementFormValidationService: ProcurementFormValidationService,
        private pop: PopAlertService
    ) {
        this.initiatePaymentOptions();
        this.constructForm();

        this.selectedPaymentOption = this.tenderService.Tender ? this.tenderService.Tender.payment_option ? this.tenderService.Tender.payment_option : this.paymentOptions[0] : this.paymentOptions[0];

        enum rfqTypes { Basic, Advanced }

        enum advancedRFQForms { PriceQuotation, TechnicalEvaluation, CompanyEvaluation }

        this.rfqTypes = rfqTypes;
        this.advancedRFQForms = advancedRFQForms;

        const previousDeliveryDate = this.tenderService.Tender ? this.tenderService.Tender.delivery_date : null;
        this.deliveryDateRange = previousDeliveryDate ? previousDeliveryDate : {
            from: new Date(),
            to: new Date().copy().addMonths(2)
        };
        this.savedLabels = ['Laptop', 'Driver'];

        const previousLabels = this.tenderService.Tender ? this.tenderService.Tender.labels : [];
        this.labels = previousLabels ? previousLabels.map(label => {
            return {name: label};
        }) : [];

        if (this.tenderService.Tender && this.tenderService.Tender.attachments) {
            this.tenderService.Tender.attachments.forEach((item) => {
                this.encodedFiles.push(item);
            });
        }
    }

    ngOnInit() {
        // @ts-ignore
        this.subscription = this.procurementFormValidationService.notifyObservable.subscribe((res) => {
            if (res.hasOwnProperty('form') && res.form === 'general') {
                if (this.form.valid) {
                    this.saveForm();
                    this.procurementFormValidationService.notifySubmit({isValid: 'general'});
                } else {
                    this.showError = true;
                    this.pop.open('Please fill the form Properly');
                }
            }
        });
        this.uploader = new FileUploader({itemAlias: 'file'});
        this.uploader.onAfterAddingFile = (file) => {
            file.withCredentials = false;
        };
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    initiatePaymentOptions() {
        this.paymentOptions = [
            '100% Advance Payment',
            '50% Advance Payment',
            '100% Payment after Delivery',
        ];
        if (this.tenderService.Tender && this.tenderService.Tender.payment_option && this.tenderService.Tender.payment_option !== '') {
            if (this.paymentOptions.findIndex(option => option === this.tenderService.Tender.payment_option) === -1) {
                this.paymentOptions.push(this.tenderService.Tender.payment_option);
            }
        }
    }

    constructForm() {
        const generalData = this.tenderService.Tender;

        this.form = this.formBuilder.group({
            title: [generalData ? generalData.title : '', Validators.required],
            labels: [''],
            no_of_vendors: [generalData ? generalData.no_of_vendors : '', Validators.required],
            last_date_of_submission: [generalData ? generalData.last_date_of_submission : '', Validators.required],
            delivery_date: [''],
            rfq_type: [generalData ? generalData.is_advanced ? 1 : 0 : 0],
            payment_option: [generalData ? generalData.payment_option : '100% Advance Payment'],
            new_payment_option: [''],
            attachments: [''],
            rfq_forms: this.formBuilder.array([generalData ? generalData.needs_price_quotation : false, generalData ? generalData.needs_technical_evaluation : false, generalData ? generalData.needs_company_evaluation : false]),
        });
    }

    get fc() {
        return this.form.controls;
    }

    getRFQFormsFormControl(i): FormControl {
        return this.getRFQFormsFormArray().controls[i] as FormControl;
    }

    getRFQFormsFormArray(): FormArray {
        return this.form.get('rfq_forms') as FormArray;
    }

    addPaymentMethod(option?) {
        const method = option || this.fc.new_payment_option.value;
        // const newValue = this.form.controls.new_payment_option.value;
        const prevValue = this.form.controls.payment_option.value;

        if (method === prevValue) {
            this.pop.open('Duplicate Payment Option');
            return;
        } else {
            this.hasErrorOnNewPaymentMethod = (method === '');
            if (this.hasErrorOnNewPaymentMethod) {
                return;
            }
            this.paymentOptions.push(method);
            this.selectedPaymentOption = method;
            this.fc.new_payment_option.setValue('');
            this.fc.payment_option.setValue(method);
            console.log(this.fc.payment_option.value);
        }

    }

    checkNewPaymentMethod(event: KeyboardEvent): void {
        if (event.keyCode === 13) {
            this.addPaymentMethod();
        } else {
            this.hasErrorOnNewPaymentMethod = false;
        }
    }

    isBasicTypeRFQ() {
        return this.form.get('rfq_type').value === this.rfqTypes.Basic;

    }

    isAdvancedTypeRFQ() {
        return this.form.get('rfq_type').value === this.rfqTypes.Advanced;
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

    addLabel(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value.charAt(0).toUpperCase() + event.value.slice(1); // Capitalizing the first character of the string

        if ((value || '').trim()) {
            const currentName = this.labels.some((item) => {
                return item.name === value;
            });

            if (currentName) {
                this.pop.open('Duplicate Label Entry');
            } else {
                this.labels.push({name: value.trim()});
            }
        }

        if (input) {
            input.value = '';
        }
    }

    removeLabel(label: Label): void {
        const index = this.labels.indexOf(label);

        if (index >= 0) {
            this.labels.splice(index, 1);
        }
    }

    saveForm() {
        const values = this.form.getRawValue();
        this.tenderService.Tender = new Tender({
            title: values.title,
            labels: this.labels ? this.labels.map(label => label.name) : [],
            no_of_vendors: values.no_of_vendors,
            last_date_of_submission: values.last_date_of_submission,
            delivery_date: this.deliveryDateRange,
            is_advanced: values.rfq_type === this.rfqTypes.Advanced,
            payment_option: values.new_payment_option ? values.new_payment_option : values.payment_option,
            attachments: values.attachments,
            needs_price_quotation: values.rfq_forms[this.advancedRFQForms.PriceQuotation],
            needs_technical_evaluation: values.rfq_forms[this.advancedRFQForms.TechnicalEvaluation],
            needs_company_evaluation: values.rfq_forms[this.advancedRFQForms.CompanyEvaluation],
        });
    }

    checkChange(e) {
        console.log(e.value);

        this.form.patchValue({
            payment_option: e.value
        });
        this.selectedPaymentOption = this.form.controls.payment_option.value;

    }

    isFormValid() {
        const values = this.form.getRawValue();
        return this.form.valid;
    }

    onFileSelect(event) {
        Array.from(event.target.files).forEach((item) => {
            const reader = new FileReader();
            reader.readAsDataURL(item as Blob);
            reader.onload = (e: any) => {
                // @ts-ignore
                this.encodedFiles.push({file: e.target.result, name: item.name});
                this.form.controls.attachments.setValue(this.encodedFiles);
            };
        });
    }

    onFileDrop(event) {
        console.log(event);
        Array.from(event).forEach((item) => {
            const reader = new FileReader();
            reader.readAsDataURL(item as Blob);
            reader.onload = (e: any) => {
                // @ts-ignore
                this.encodedFiles.push({file: e.target.result, name: item.name});
                this.form.controls.attachments.setValue(this.encodedFiles);
            };
        });
    }

    removeSelectedFile(item) {
        const index = this.encodedFiles.indexOf(item);
        this.encodedFiles.splice(index, 1);
        this.form.controls.attachments.setValue(this.encodedFiles);
    }

    limitString(str) {
        return (str && str.length > 30) ? str.slice(0, 30) + '..' : str;
    }
}
