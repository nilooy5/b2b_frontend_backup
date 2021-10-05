import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ShebaHttpService} from '../../../../../../../../../modules/sheba-http/sheba-http.service';
import {PopAlertService} from '../../../../../../../../../modules/pop-alert/pop-alert.service';
import {TenderProposalAdvancedStorageService} from '../../../../../../../../../services/tender-proposal-advanced-storage-service/tender-proposal-advanced-storage.service';

@Component({
    selector: 'app-tender-proposal-advanced-form-info',
    templateUrl: './tender-proposal-advanced-form-info.component.html',
    styleUrls: ['./tender-proposal-advanced-form-info.component.scss']
})
export class TenderProposalAdvancedFormInfoComponent implements OnInit {

    attachments;
    notValidForm = true;
    companyPhoneValid: boolean;

    @Input() tender;
    @Input() totalStates;
    @Input() nextStateIndex;

    @Output() proposalFormEmitter = new EventEmitter();
    @Output() stepIncrementer = new EventEmitter();
    @Output() lastStepAlert = new EventEmitter();

    storageValues: any;

    proposalForm = new FormGroup({
        price: new FormControl(null, Validators.required),
        proposal: new FormControl(null, Validators.required),
        company_name: new FormControl(null, Validators.required),
        name: new FormControl(null, Validators.required),
        company_phone: new FormControl(null, Validators.required),
        email: new FormControl(),
        status: new FormControl('sent')
    });

    constructor(private http: ShebaHttpService,
                private pop: PopAlertService,
                private formBuilder: FormBuilder,
                private tenderParticipateStorage: TenderProposalAdvancedStorageService) {
        this.storageValues = this.tenderParticipateStorage.BasicForm;
    }

    ngOnInit() {
        // console.log(this.totalStates);
        // console.log(this.nextStateIndex);
        this.initializeFormData();
        if (this.storageValues) {
            this.verify_phone();
        }
        // this.verify_phone();
        // console.log(this.proposalForm.status);
        // console.log(this.companyPhoneValid);
        // console.log(this.storageValues);
    }

    initializeFormData() {
        this.proposalForm.setValue(this.storageValues);
    }

    receiveAttachments($event) {
        this.attachments = $event;
        this.proposalForm.addControl('attachment', new FormControl(this.attachments));
    }

    get proposalFormControls() {
        return this.proposalForm.controls;
    }

    verify_phone(event?) {
        let storagePhone = this.storageValues ? this.storageValues.company_phone : 'null';
        let value = 'null';
        if (event) {
            value = event.target.value;
            storagePhone = event.target.value;
        }
        const company_phone = /^(?:\+?88)?01[013|13|014|14|018|18|016|16|017|17|019|19|015|15]\d{8}$/;
        if (value.match(company_phone) || storagePhone.match(company_phone)) {
            this.companyPhoneValid = true;
        } else {
            this.companyPhoneValid = false;
        }
        // console.log(this.companyPhoneValid);
    }


    checkFormValidity() {
        return this.notValidForm = !(this.proposalForm && this.proposalForm.status === 'VALID' && this.companyPhoneValid);
    }

    sendForm() {
        if (this.nextStateIndex < (this.totalStates - 1)) {
            this.stepIncrementer.emit(1);
            this.proposalFormEmitter.emit(this.proposalForm);
        } else if (this.nextStateIndex === (this.totalStates - 1)) {
            this.proposalFormEmitter.emit(this.proposalForm);
            // console.log('post now');
            this.sendLastStepAlert();
        }
    }

    sendLastStepAlert() {
        this.lastStepAlert.emit(true);
    }
}
