import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatStepper} from '@angular/material/stepper';
import {state} from '@angular/animations';

@Component({
    selector: 'app-tender-proposal-advanced-stepper',
    templateUrl: './tender-proposal-advanced-stepper.component.html',
    styleUrls: ['./tender-proposal-advanced-stepper.component.scss']
})
export class TenderProposalAdvancedStepperComponent implements OnInit, OnChanges {

    isLinear = false;
    firstFormGroup: FormGroup;

    @Input() tender;
    @Input() nextStateIndex: number;
    @Output() currentStateEvent = new EventEmitter();
    state: any;
    currentState: string;
    allStates = ['form'];
    totalStates: number;
    @Output() totalStatesEmitter = new EventEmitter();

    constructor(private fb: FormBuilder) {
    }

    ngOnChanges() {
        // TO-DO delete these if getting error
        console.log(this.allStates[this.nextStateIndex]);
        const nextStateName = this.allStates[this.nextStateIndex];
        this.currentStateEvent.emit(nextStateName);
    }

    ngOnInit() {
        this.firstFormGroup = this.fb.group({
            firstCtrl: ['', Validators.required]
        });
        this.generateStatesArray();
        console.log(this.allStates);
        this.totalStates = this.allStates.length;
        console.log(this.totalStates);
        this.totalStatesEmitter.emit(this.totalStates);
    }

    goBack(stepper: MatStepper) {
        stepper.previous();
    }

    goForward(stepper: MatStepper) {
        stepper.next();
        console.log(stepper._steps);
    }

    generateStatesArray() {
        if (this.tender.price_quotation) {
            this.allStates.push('quotation');
        }
        if (this.tender.company_evaluation) {
            this.allStates.push('companyEval');
        }
        if (this.tender.technical_evaluation) {
            this.allStates.push('techEval');
        }
    }

    passState(stateName: any) {
        this.currentState = stateName;
        this.currentStateEvent.emit(this.currentState);
        this.setStateIndex(stateName);
    }

    setStateIndex(stateName) {
        const stateIndex = this.allStates.findIndex(item => item === stateName);
        console.log(stateIndex);
        return stateIndex;
    }
}
