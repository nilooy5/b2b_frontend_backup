import { Component, OnInit } from '@angular/core';
import {TenderService} from '../../../../../../../services/tender-service/tender.service';

@Component({
    selector: 'app-procurement-tender-add-technical',
    templateUrl: './procurement-tender-add-technical.component.html',
    styleUrls: ['./procurement-tender-add-technical.component.scss']
})
export class ProcurementTenderAddTechnicalComponent implements OnInit {

    storedQuestions: any[] = [];
    questions: any[] = [];

    constructor(private tenderService: TenderService) { }

    ngOnInit() {
        this.storedQuestions = this.tenderService.TechnicalEvaluationData ? this.tenderService.TechnicalEvaluationData : [];
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

    handleQuestionUpdates(question: any[]) {
        this.questions = question.map( res => {
            return {
                title: res.question,
                is_required: res.required === true ? '1' : '0',
                type: res.type,
                options: res.options,
                result: null
            };
        });
        this.tenderService.TechnicalEvaluationData = this.questions;
    }

}
