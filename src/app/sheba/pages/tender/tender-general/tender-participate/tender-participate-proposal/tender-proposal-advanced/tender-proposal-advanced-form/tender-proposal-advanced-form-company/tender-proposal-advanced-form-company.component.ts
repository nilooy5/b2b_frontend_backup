import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TenderProposalAdvancedStorageService} from '../../../../../../../../../services/tender-proposal-advanced-storage-service/tender-proposal-advanced-storage.service';

@Component({
    selector: 'app-tender-proposal-advanced-form-company',
    templateUrl: './tender-proposal-advanced-form-company.component.html',
    styleUrls: ['./tender-proposal-advanced-form-company.component.scss']
})
export class TenderProposalAdvancedFormCompanyComponent implements OnInit {

    evaluationForm = [];
    selectedOptions = [];

    @Input() tender;
    @Input() totalStates;
    @Input() nextStateIndex;
    @Output() companyEvalFormEmitter = new EventEmitter();
    @Output() stepIncrementer = new EventEmitter();
    @Output() lastStepAlert = new EventEmitter();
    evaluations;
    isFormValid = false;
    storageData: any;

    constructor(private tenderParticipateStorage: TenderProposalAdvancedStorageService) {
        this.storageData = tenderParticipateStorage.CompanyEvaluation;
    }

    ngOnInit() {
        this.evaluations = this.tender.company_evaluation;
        this.initializeEvaluationForm();
        this.checkFormValidity();
        window.scrollTo(0, 0);
        // console.log(this.totalStates);
        // console.log(this.nextStateIndex);
    }

    initializeEvaluationForm() {
        if (this.storageData) {
            this.evaluationForm = this.storageData.map((item) => {
                return {
                    id: item.id,
                    result: item.result
                };
            });
        } else {
            this.evaluationForm = this.tender.company_evaluation.map((item) => {
                return {
                    id: item.field_id,
                    result: ''
                };
            });
        }
    }

    findStoredValue(field_id) {
        for (let i = 0; i < this.evaluationForm.length; i++) {
            if (this.evaluationForm[i].id === field_id) {
                // console.log(this.newForm[i].result);
                return this.evaluationForm[i].result;
            }
        }
    }

    getCheckedValue(option, fieldId) {
        const selectedValue = this.findStoredValue(fieldId);
        if (option === selectedValue) {
            return true;
        }
    }

    emitOnFormChange(index, event: Event, label) {
        const target = event.target as HTMLInputElement;

        switch (target.type) {
            case 'radio' : {
                this.evaluationForm[index].result = label;
                break;
            }
            case 'checkbox' : {
                this.evaluationForm[index].result += label + ',';
                break;
            }
            default: {
                this.evaluationForm[index].result = target.value;
            }
        }
        this.checkFormValidity();
        // console.log(this.isFormValid);
        // console.log(this.evaluationForm);
    }

    checkFormValidity() {
        let validator = 0;
        for (let i = 0; i < this.evaluationForm.length; i++) {
            if (this.evaluationForm[i].result.length) {
                validator++;
            }
        }
        this.isFormValid = (validator === this.evaluationForm.length);
    }

    sendCompanyEval() {
        if (this.nextStateIndex < (this.totalStates - 1)) {
            this.stepIncrementer.emit(1);
            this.companyEvalFormEmitter.emit(this.evaluationForm);
        } else if (this.nextStateIndex === (this.totalStates - 1)) {
            this.companyEvalFormEmitter.emit(this.evaluationForm);
            console.log('post now');
            this.sendLastStepAlert();
        }
    }

    sendLastStepAlert() {
        this.lastStepAlert.emit(true);
    }
}
