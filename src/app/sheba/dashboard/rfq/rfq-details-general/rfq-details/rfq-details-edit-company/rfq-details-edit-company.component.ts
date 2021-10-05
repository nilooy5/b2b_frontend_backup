import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Evaluation} from '../../../../../../types/rfq';
import {ActivatedRoute, Router} from '@angular/router';
import {DashboardResolveService} from '../../../../dashboard-resolve.service';
import {Breadcrumb} from '../../../../../../types/general';
import {DashboardSharedService} from '../../../../../../services/dashboard-shared.service';
import {delay} from 'rxjs/operators';
import {LoadingModalComponent} from '../../../../../modals/loading-modal/loading-modal.component';
import {ConfirmModalComponent} from '../../../../../modals/confirm-modal/confirm-modal.component';
import {RfqDetailsEditService} from '../../../rfq-services/rfq-details-services/rfq-details-edit.service';
import {MatDialog} from '@angular/material';

@Component({
    selector: 'app-rfq-details-edit-company',
    templateUrl: './rfq-details-edit-company.component.html',
    styleUrls: ['./rfq-details-edit-company.component.scss']
})

export class RfqDetailsEditCompanyComponent implements OnDestroy {

    toggleSubscription: Subscription;
    $updatedCompanyEvaluationSubscription: Subscription;
    isSidebarOpen = false;

    breadcrumb: Breadcrumb[];
    rfqId;

    receivedCompanyQuestions: any[] = [];
    updatedCompanyQuestions: Evaluation[] = [];

    loadingDialogRef;

    constructor(private activatedRoute: ActivatedRoute,
                private dashboardSharedService: DashboardSharedService,
                private rfqDetailsEditService: RfqDetailsEditService,
                private router: Router,
                private dialog: MatDialog,
                private dashboardService: DashboardResolveService) {

        this.rfqId = activatedRoute.snapshot.parent.parent.params.id;
        this.initializeBreadCrumb(this.rfqId);
        this.dashboardSharedService.changeBreadcrumb(true, this.breadcrumb);

        this.toggleSubscription = this.dashboardService.DashboardBehavior.asObservable().subscribe(res => {
            this.isSidebarOpen = res.open;
        });

        activatedRoute.data.subscribe(({ rfqDetailsEdit }) => {
            this.handlePreviousQuestions(rfqDetailsEdit.company_evaluation);
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
            this.receivedCompanyQuestions = items.map((item) => {
                return {
                    question: item.title,
                    type: item.input_type,
                    options: JSON.parse(item.variables).options,
                    required: parseInt(JSON.parse(item.variables).is_required) === 1
                };
            });
        }
    }

    handleQuestionUpdates(question: any[]) {
        if (question.length) {
            this.updatedCompanyQuestions = question.map(res => {
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
        this.updatedCompanyQuestions = [];
    }

    updateCompanyEvaluation() {
        let constructedData;

        if (this.updatedCompanyQuestions && this.updatedCompanyQuestions.length > 0) {
            constructedData = [
                {
                    item_type: 'company_evaluation',
                    fields: this.updatedCompanyQuestions
                }
            ];
        } else {
            constructedData = [];
        }

        const data = { item_type: 'company_evaluation', item: JSON.stringify(constructedData) };
        this.postToApi(data);
    }

    postToApi(data) {
        this.openLoadingModal();
        this.$updatedCompanyEvaluationSubscription = this.rfqDetailsEditService.updateAdvanceRfq(data).pipe(delay(2000)).subscribe(
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
            title: 'Company Evaluation is updating',
            text: 'Please wait few moments, company evaluation is updating'
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
        this.toggleSubscription.unsubscribe();
    }

    redirectToRfqDetails() {
        this.router.navigate(['/', 'dashboard', 'rfq', 'list', this.rfqId, 'details']);
    }


}
