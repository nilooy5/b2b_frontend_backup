import { Component, OnInit } from '@angular/core';
import {TenderService} from '../../../../../../../services/tender-service/tender.service';
import {StorageService} from '../../../../../../../services/storage.service';

@Component({
    selector: 'app-procurement-tender-add-company',
    templateUrl: './procurement-tender-add-company.component.html',
    styleUrls: ['./procurement-tender-add-company.component.scss']
})
export class ProcurementTenderAddCompanyComponent implements OnInit {

    storedQuestions: any[] = [];
    questions: any[] = [];
    constructor(private tenderService: TenderService) { }

    ngOnInit() {
        this.storedQuestions = this.tenderService.CompanyEvaluationData ? this.tenderService.CompanyEvaluationData : [];
        this.handlePreviousQuestions(this.storedQuestions);
    }

    handlePreviousQuestions(items) {
        if (items) {
            this.storedQuestions = this.storedQuestions.map((item) => {
                return {
                    question: item.title,
                    type: item.type,
                    options: item.options,
                    required: parseInt(item.is_required) === 1
                };
            });
        } else {
            console.error('Error');
        }
    }

    handleQuestionUpdates(question) {
            this.questions = question.map( res => {
                return {
                    title: res.question,
                    is_required: res.required === true ? '1' : '0',
                    type: res.type,
                    options: res.options,
                    result: null
                };
            });
            this.tenderService.CompanyEvaluationData = this.questions;
    }
}
