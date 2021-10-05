import {Component, OnDestroy, OnInit} from '@angular/core';
import {TenderService} from '../../../../../services/tender-service/tender.service';
import {RfqStorageService} from '../../../../../services/rfq-storage-service/rfq-storage.service';
import {Router} from '@angular/router';
import {Breadcrumb} from '../../../../../types/general';
import {DashboardSharedService} from '../../../../../services/dashboard-shared.service';
import {RfqCreateSharedService} from '../../rfq-services/rfq-create-services/rfq-create-shared.service';
import {Evaluation} from '../../../../../types/rfq';

@Component({
    selector: 'app-rfq-create-evaluation-technical',
    templateUrl: './rfq-create-evaluation-technical.component.html',
    styleUrls: ['./rfq-create-evaluation-technical.component.scss']
})

export class RfqCreateEvaluationTechnicalComponent implements OnDestroy {
    breadcrumb: Breadcrumb[] = [
        {
            title: 'Request for quotation',
            path: '/dashboard/rfq/create'
        },
        {
            title: 'Create new',
            path: '/dashboard/rfq/create'
        },
        {
            title: 'Technical Evaluation',
            isActive: true
        }
    ];

    storedTechnicalQuestions: any[] = [];
    questions: Evaluation[] = [];

    constructor(private rfqStorageService: RfqStorageService,
                private rfqCreateSharedService: RfqCreateSharedService,
                private dashboardSharedService: DashboardSharedService,
                private router: Router) {
        this.dashboardSharedService.changeBreadcrumb(true, this.breadcrumb);
        this.storedTechnicalQuestions = this.rfqStorageService.TechnicalEvaluation ? this.rfqStorageService.TechnicalEvaluation : [];
        this.handlePreviousQuestions(this.storedTechnicalQuestions);
        this.storeTechnicalEvaluation();
    }

    ngOnDestroy() {
        this.dashboardSharedService.changeBreadcrumb(false);
    }

    handlePreviousQuestions(items) {
        if (items) {
            this.storedTechnicalQuestions = this.storedTechnicalQuestions.map((item) => {
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
        if (question.length) {
            this.questions = question.map(res => {
                return {
                    title: res.question,
                    is_required: res.required === true ? '1' : '0',
                    type: res.type,
                    options: res.options,
                    result: null
                };
            });
            return;
        }
        this.questions = [];
    }

    storeTechnicalEvaluation() {
        this.rfqCreateSharedService.currentJourneySubmitStatus.subscribe((res) => {
            if (res.route === 'technical') {
                this.rfqStorageService.TechnicalEvaluation = this.questions && this.questions.length ? this.questions : null;
                this.router.navigate(['/', 'dashboard', 'rfq', 'create']);
            }
        });
    }
}
