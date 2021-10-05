import { Component, OnDestroy, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Breadcrumb, ETable} from '../../../../../../types/general';
import { RfqCreateSharedService } from '../../../rfq-services/rfq-create-services/rfq-create-shared.service';
import { Subscription } from 'rxjs';
import { DashboardResolveService } from '../../../../dashboard-resolve.service';
import {DashboardSharedService} from '../../../../../../services/dashboard-shared.service';
import {delay} from 'rxjs/operators';
import {LoadingModalComponent} from '../../../../../modals/loading-modal/loading-modal.component';
import {ConfirmModalComponent} from '../../../../../modals/confirm-modal/confirm-modal.component';
import {RfqDetailsEditService} from '../../../rfq-services/rfq-details-services/rfq-details-edit.service';
import {MatDialog} from '@angular/material';

@Component({
    selector: 'app-rfq-details-edit-price',
    templateUrl: './rfq-details-edit-price.component.html',
    styleUrls: ['./rfq-details-edit-price.component.scss']
})

export class RfqDetailsEditPriceComponent implements OnDestroy {

    toggleSubscription: Subscription;
    $updatedPriceQuotationSubscription: Subscription;

    receivedQuotationList: any[] = [];
    updatedQuotationList: any[] = [];

    tableInitialData: ETable[] = [
        {
            label: '#',
            value: 'serialNo',
            type: 'number',
            increment: 'true'
        },
        {
            label: 'Item Name / Description',
            value: 'itemName',
            type: 'text',
            increment: 'false'
        },
        {
            label: 'Specification',
            value: 'specification',
            type: 'text',
            increment: 'false'
        },
        {
            label: 'Unit',
            value: 'unit',
            type: 'number',
            increment: 'false'
        },
        {
            label: '',
            value: 'actionsColumn',
            type: '',
            increment: 'false'
        }
    ];

    isSidebarOpen = false;
    loadingDialogRef;

    breadcrumb: Breadcrumb[];
    rfqId;

    constructor(private activatedRoute: ActivatedRoute,
                private rfqCreateSharedService: RfqCreateSharedService,
                private dashboardSharedService: DashboardSharedService,
                private dialog: MatDialog,
                private router: Router,
                private rfqDetailsEditService: RfqDetailsEditService,
                private dashboardService: DashboardResolveService) {

        this.rfqId = activatedRoute.snapshot.parent.parent.params.id;
        this.initializeBreadCrumb(this.rfqId);
        this.dashboardSharedService.changeBreadcrumb(true, this.breadcrumb);

        this.toggleSubscription = this.dashboardService.DashboardBehavior.asObservable().subscribe(res => {
            this.isSidebarOpen = res.open;
        });

        activatedRoute.data.subscribe(( { rfqDetailsEdit }) => {
            this.handlePreviousQuotationList(rfqDetailsEdit.price_quotation);
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

    handlePreviousQuotationList(quotations) {
        if (quotations) {
            this.receivedQuotationList = quotations.map((item) => {
                return {
                    itemName: item.title,
                    specification: item.short_description,
                    unit: JSON.parse(item.variables).unit
                };
            });
        }
    }

    handleQuotationList(quotationList) {
        if (quotationList.length) {
            this.updatedQuotationList = quotationList.map(res => {
                return {
                    title: res.itemName,
                    type: 'number',
                    short_description: res.specification,
                    unit: res.unit
                };
            });
            return;
        }
        this.updatedQuotationList = [];
    }

    updatePriceQuotation() {
        let constructedData;
        if (this.updatedQuotationList && this.updatedQuotationList.length > 0) {
            constructedData = [
                {
                    item_type: 'price_quotation',
                    fields: this.updatedQuotationList
                }
            ];
        } else {
            constructedData = [];
        }
        const data = { item_type: 'price_quotation', item: JSON.stringify(constructedData) };
        this.postToApi(data);
    }

    postToApi(data) {
        this.openLoadingModal();
        this.$updatedPriceQuotationSubscription = this.rfqDetailsEditService.updateAdvanceRfq(data).pipe(delay(1500)).subscribe(
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
            title: 'Price Quotation is updating',
            text: 'Please wait few moments, price quotation is updating'
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

    ngOnDestroy() {
        this.toggleSubscription.unsubscribe();
        this.dashboardSharedService.changeBreadcrumb(false);
    }

    redirectToRfqDetails() {
        this.router.navigate(['/', 'dashboard', 'rfq', 'list', this.rfqId, 'details']);
    }
}
