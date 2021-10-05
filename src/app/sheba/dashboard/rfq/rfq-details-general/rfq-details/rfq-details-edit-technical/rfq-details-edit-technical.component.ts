import { Component, OnDestroy } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Evaluation } from '../../../../../../types/rfq';
import { Subscription } from 'rxjs';
import { DashboardResolveService } from '../../../../dashboard-resolve.service';
import { RfqDetailsEditService } from '../../../rfq-services/rfq-details-services/rfq-details-edit.service';
import {Breadcrumb} from '../../../../../../types/general';
import {DashboardSharedService} from '../../../../../../services/dashboard-shared.service';
import {MatDialog} from '@angular/material';
import {ConfirmModalComponent} from '../../../../../modals/confirm-modal/confirm-modal.component';
import {LoadingModalComponent} from '../../../../../modals/loading-modal/loading-modal.component';
import {delay} from 'rxjs/operators';

@Component({
    selector: 'app-rfq-details-edit-technical',
    templateUrl: './rfq-details-edit-technical.component.html',
    styleUrls: ['./rfq-details-edit-technical.component.scss']
})

export class RfqDetailsEditTechnicalComponent implements OnDestroy {

    $toggleSubscription: Subscription;
    $updatedTechnicalEvaluationSubscription: Subscription;
    isSidebarOpen = false;

    breadcrumb: Breadcrumb[];
    rfqId;

    receivedTechnicalQuestions: any[] = [];
    updatedTechnicalQuestions: Evaluation[] = [];

    loadingDialogRef;

    constructor(private activatedRoute: ActivatedRoute,
                private rfqDetailsEditService: RfqDetailsEditService,
                private dashboardSharedService: DashboardSharedService,
                private dialog: MatDialog,
                private router: Router,
                private dashboardService: DashboardResolveService) {

        this.rfqId = activatedRoute.snapshot.parent.parent.params.id;
        this.initializeBreadCrumb(this.rfqId);
        this.dashboardSharedService.changeBreadcrumb(true, this.breadcrumb);

        this.$toggleSubscription = this.dashboardService.DashboardBehavior.asObservable().subscribe(res => {
            this.isSidebarOpen = res.open;
        });

        activatedRoute.data.subscribe(({ rfqDetailsEdit }) => {
            this.handlePreviousQuestions(rfqDetailsEdit.technical_evaluation);
        });
    }

    initializeBreadCrumb(rfqId) {
        this.breadcrumb = [
            {
                title: 'List',
                path: '/dashboard/rfq/list'
            },
            {
                title: 'Tender Details',
                path: `/dashboard/rfq/list/${rfqId}/details`
            },
            {
                title: 'Details',
                isActive: true
            },
            {
                title: 'Edit',
                isActive: true
            }
        ];
    }

    handlePreviousQuestions(items) {
        if (items) {
            this.receivedTechnicalQuestions = items.map((item) => {
                return {
                    question: item.title,
                    type: item.input_type,
                    options: JSON.parse(item.variables).options,
                    required: parseInt(JSON.parse(item.variables).is_required) === 1
                };
            });
        }
    }

    handleQuestionUpdates(question) {
        if (question.length) {
            this.updatedTechnicalQuestions = question.map(res => {
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
        this.updatedTechnicalQuestions = [];
    }

    updateTechnicalEvaluation() {
        let constructedData;

        if (this.updatedTechnicalQuestions && this.updatedTechnicalQuestions.length > 0) {
            constructedData = [
                {
                    item_type: 'company_evaluation',
                    fields: this.updatedTechnicalQuestions
                }
            ];
        } else {
            constructedData = [];
        }

        const data = { item_type: 'technical_evaluation', item: JSON.stringify(constructedData) };
        this.postToApi(data);
    }

    postToApi(data) {
        this.openLoadingModal();
        this.$updatedTechnicalEvaluationSubscription = this.rfqDetailsEditService.updateAdvanceRfq(data).pipe(delay(2000)).subscribe(
            (response) => {
                this.loadingDialogRef.close();
                response.code === 200 ? this.navigateToRfqDetails() : this.openErrorModal();
            },
            (error) => {
                this.loadingDialogRef.close();
                this.openErrorModal();
            });
    }

    openLoadingModal() {
        let data: { image: string, title: string, text: string};
        data = {
            image: 'assets/svg/hourglass.svg',
            title: 'Technical Evaluation is updating',
            text: 'Please wait few moments, technical evaluation is updating'
        };

        this.loadingDialogRef = this.dialog.open(LoadingModalComponent, {
            data,
            maxWidth: '570px',
            minWidth: '570px',
            height: 'auto',
            panelClass: 'dialog-confirmation'
        });
    }

    openErrorModal() {
        const data = {
            type: 'failure',
            title: 'Error',
            text: 'Something went wrong! Please, try again later!',
            actionText: 'Close'
        };

        this.dialog.open(ConfirmModalComponent, {
            data,
            maxWidth: '540px',
            height: 'auto',
            panelClass: 'dialog-confirmation'
        });
    }

    navigateToRfqDetails() {
        this.router.navigate(['/', 'dashboard', 'rfq', 'list', this.rfqId, 'details']);
    }

    ngOnDestroy(): void {
        this.$toggleSubscription.unsubscribe();
        if (this.$updatedTechnicalEvaluationSubscription) { this.$updatedTechnicalEvaluationSubscription.unsubscribe(); }
    }

    redirectToRfqDetails() {
        this.router.navigate(['/', 'dashboard', 'rfq', 'list', this.rfqId, 'details']);
    }

}
