import {Component, OnDestroy, OnInit} from '@angular/core';
import {RfqStorageService} from '../../../../../services/rfq-storage-service/rfq-storage.service';
import {Router} from '@angular/router';
import {Breadcrumb} from '../../../../../types/general';
import {DashboardSharedService} from '../../../../../services/dashboard-shared.service';
import {RfqCreateSharedService} from '../../rfq-services/rfq-create-services/rfq-create-shared.service';
import {Evaluation} from '../../../../../types/rfq';

@Component({
    selector: 'app-rfq-create-evaluation-company',
    templateUrl: './rfq-create-evaluation-company.component.html',
    styleUrls: ['./rfq-create-evaluation-company.component.scss']
})

export class RfqCreateEvaluationCompanyComponent implements OnDestroy {

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
            title: 'Company Evaluation',
            isActive: true
        }
    ];

    storedCompanyQuestions: any[] = [];
    questions: Evaluation[] = [];

    constructor(private rfqStorageService: RfqStorageService,
                private rfqCreateSharedService: RfqCreateSharedService,
                private dashboardSharedService: DashboardSharedService,
                private router: Router) {
        this.dashboardSharedService.changeBreadcrumb(true, this.breadcrumb);
        this.storedCompanyQuestions = this.rfqStorageService.CompanyEvaluation ? this.rfqStorageService.CompanyEvaluation : [];
        this.handlePreviousQuestions(this.storedCompanyQuestions);
        this.storeCompanyEvaluation();
    }

    ngOnDestroy() {
        this.dashboardSharedService.changeBreadcrumb(false);
    }

    handlePreviousQuestions(items) {
        if (items) {
            this.storedCompanyQuestions = this.storedCompanyQuestions.map((item) => {
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
            this.questions = question.map( res => {
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

    storeCompanyEvaluation() {
        this.rfqCreateSharedService.currentJourneySubmitStatus.subscribe((res) => {
            if (res.route === 'company') {
                this.rfqStorageService.CompanyEvaluation = this.questions && this.questions.length ? this.questions : null;
                this.router.navigate(['/', 'dashboard', 'rfq', 'create']);
            }
        });
    }
}
