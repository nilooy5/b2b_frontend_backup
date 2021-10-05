import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TenderProposalAdvancedStorageService} from '../../../../../../../../../services/tender-proposal-advanced-storage-service/tender-proposal-advanced-storage.service';

@Component({
    selector: 'app-tender-proposal-advanced-form-technical',
    templateUrl: './tender-proposal-advanced-form-technical.component.html',
    styleUrls: ['./tender-proposal-advanced-form-technical.component.scss']
})
export class TenderProposalAdvancedFormTechnicalComponent implements OnInit {

    @Input() tender;
    @Input() totalStates;
    @Input() nextStateIndex;
    @Output() techEvalFormEmitter = new EventEmitter();
    @Output() stepIncrementer = new EventEmitter();
    @Output() lastStepAlert = new EventEmitter();
    evaluations;
    evaluationForm;
    isFormValid = false;
    storageData: any;

    constructor(private tenderParticipateStorage: TenderProposalAdvancedStorageService) {
        this.storageData = tenderParticipateStorage.TechnicalEvaluation;
    }

    ngOnInit() {
        this.evaluations = this.tender.technical_evaluation;
        this.initializeEvaluationForm();
        this.checkFormValidity();
        window.scrollTo(0, 0);
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
            this.evaluationForm = this.tender.technical_evaluation.map((item) => {
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

    sendTechEval() {
        if (this.nextStateIndex < (this.totalStates - 1)) {
            this.stepIncrementer.emit(1);
            this.techEvalFormEmitter.emit(this.evaluationForm);
        } else if (this.nextStateIndex === (this.totalStates - 1)) {
            this.techEvalFormEmitter.emit(this.evaluationForm);
            console.log('post now');
            this.sendLastStepAlert();
        }
    }

    sendLastStepAlert() {
        this.lastStepAlert.emit(true);
    }

}
