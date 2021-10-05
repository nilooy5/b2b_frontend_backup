import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TableDataSource} from 'angular4-material-table';
import {NumericFormat} from '../../../../../../../../../helpers/numeric_format.service';
import {TenderProposalAdvancedStorageService} from '../../../../../../../../../services/tender-proposal-advanced-storage-service/tender-proposal-advanced-storage.service';

@Component({
    selector: 'app-tender-proposal-advanced-form-quotation',
    templateUrl: './tender-proposal-advanced-form-quotation.component.html',
    styleUrls: ['./tender-proposal-advanced-form-quotation.component.scss']
})
export class TenderProposalAdvancedFormQuotationComponent implements OnInit {

    newForm = [];
    isFormValid = false;
    totalPrice = 0;

    @Input() tender;
    @Input() totalStates;
    @Input() nextStateIndex;
    @Output() quoteFormEmitter = new EventEmitter();
    @Output() stepIncrementer = new EventEmitter();
    @Output() lastStepAlert = new EventEmitter();
    dataSource: TableDataSource<any>;
    displayColumns = ['serialNo', 'itemName', 'specification', 'unit', 'price'];

    storageData: any;

    constructor(public numericFormat: NumericFormat,
                private tenderParticipateStorage: TenderProposalAdvancedStorageService) {
        this.storageData = tenderParticipateStorage.PriceQuotation;
    }

    ngOnInit() {
        this.dataSource = this.tender.price_quotation;
        this.initializeNewForm();
        this.checkFormValidity();
        this.calculateTotalPrice();
        window.scrollTo(0, 0);
    }

    initializeNewForm() {
        if (this.storageData) {
            this.newForm = this.storageData.map((item) => {
                return {
                    id: item.id,
                    result: item.result
                };
            });
        } else {
            this.newForm = this.tender.price_quotation.map((item) => {
                return {
                    id: item.field_id,
                    result: ''
                };
            });
        }
        // console.log(this.newForm);
    }

    findStoredValue(field_id) {
        for (let i = 0; i < this.newForm.length; i++) {
            if (this.newForm[i].id === field_id) {
                // console.log(this.newForm[i].result);
                return this.newForm[i].result;
            }
        }
    }

    emitOnFormChange(index, event: Event) {
        const target = event.target as HTMLInputElement;
        this.newForm[index].result = target.value;
        this.checkFormValidity();
        this.calculateTotalPrice();
    }

    checkFormValidity() {
        let validator = 0;
        for (let i = 0; i < this.newForm.length; i++) {
            if (this.newForm[i].result.length) {
                validator++;
            }
        }
        this.isFormValid = (validator === this.newForm.length);
    }

    calculateTotalPrice() {
        let sum = 0;
        for (let i = 0; i < this.newForm.length; i++) {
            sum = sum + Number(this.newForm[i].result);
        }
        this.totalPrice = sum;
    }

    sendQuoteForm() {
        if (this.nextStateIndex < (this.totalStates - 1)) {
            this.stepIncrementer.emit(1);
            this.quoteFormEmitter.emit(this.newForm);
        } else if (this.nextStateIndex === (this.totalStates - 1)) {
            this.quoteFormEmitter.emit(this.newForm);
            console.log('post now');
            this.sendLastStepAlert();
        }
    }

    sendLastStepAlert() {
        this.lastStepAlert.emit(true);
    }
}
