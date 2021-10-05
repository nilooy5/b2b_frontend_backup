import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardSharedService } from '../../../../../services/dashboard-shared.service';
import { RfqInviteStorageService } from '../../../../../services/rfq-invite-storage-service/rfq-invite-storage.service';
import { RfqInviteService } from '../../rfq-services/rfq-invite/rfq-invite.service';
import { MatDialog } from '@angular/material';
import { LoadingModalComponent } from '../../../../modals/loading-modal/loading-modal.component';
import { delay } from 'rxjs/operators';
import { Breadcrumb } from '../../../../../types/general';
import { RfqVendors } from '../../../../../types/rfq';


@Component({
    selector: 'app-rfq-invite',
    templateUrl: './rfq-invite.component.html',
    styleUrls: ['./rfq-invite.component.scss']
})

export class RfqInviteComponent implements OnInit, OnDestroy {

    hasVendorInBusiness = false;
    numberOfVendorSelected = 0;
    showSuccessAlert = false;
    loadingDialogRef;

    breadcrumb: Breadcrumb[] = [
        {
            title: 'Tender',
            path: '/dashboard/rfq/create'
        },
        {
            title: 'Create New',
            path: `/dashboard/rfq/create`
        },
        {
            title: 'Invite',
            isActive: true
        }
    ];

    constructor(private dashboardSharedService: DashboardSharedService,
                private rfqInviteStorageService: RfqInviteStorageService,
                private rfqInviteService: RfqInviteService,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private dialog: MatDialog) {
        this.checkVendorList();
        this.initializeBreadcrumb(true, this.breadcrumb);
        this.initializeDashboardHeaderTitle('Invite to your Tender');
        this.rfqInviteStorageService.resetRfqInviteStorage();
        if (this.rfqInviteStorageService.SelectedVendorsCount) {
            this.numberOfVendorSelected = this.rfqInviteStorageService.SelectedVendorsCount;
        }
    }

    ngOnInit() {
        const showSuccess = window.history.state.showSuccessMessage;
        const tenderId = window.history.state.tenderId;
        if (showSuccess) { this.showSuccessAlert = showSuccess; }
        if (tenderId) { this.rfqInviteStorageService.TenderId = tenderId; }
    }

    initializeBreadcrumb(showBreadcrumb: boolean, breadcrumbArray = null) {
        this.dashboardSharedService.changeBreadcrumb(showBreadcrumb, breadcrumbArray);
    }

    initializeDashboardHeaderTitle(title: string) {
        this.dashboardSharedService.changeHeaderTitle(title);
    }

    checkVendorList() {
        this.activatedRoute.data.subscribe(({ vendorList }) => {
            const { own_vendors } = vendorList as { own_vendors: RfqVendors[] };
            if (own_vendors && own_vendors.length) { this.hasVendorInBusiness = true; }
        });
    }

    handleVendorCount(vendorCount: number) {
        this.numberOfVendorSelected = vendorCount;
    }

    ngOnDestroy() {
        this.initializeBreadcrumb(true);
        this.initializeDashboardHeaderTitle(null);
    }

    sendInvitation() {
        const selectedVendorsFromOwnList = this.rfqInviteStorageService.OwnListedSelectedVendors ? this.rfqInviteStorageService.OwnListedSelectedVendors : [];
        const selectedVendorsFromShebaVerified = this.rfqInviteStorageService.ShebaVerifiedSelectedVendors ? this.rfqInviteStorageService.ShebaVerifiedSelectedVendors : [];
        const vendors = this.extractIdFromSelectedVendors([...selectedVendorsFromOwnList, ...selectedVendorsFromShebaVerified]);
        const tenderId = this.rfqInviteStorageService.TenderId;
        this.postToApi(tenderId, vendors);
    }

    extractIdFromSelectedVendors(selectedVendors: RfqVendors[]) {
        return selectedVendors.map((item) => item.id);
    }

    postToApi(tenderId, vendors: Array<number>) {
        this.openLoadingModal();
        this.rfqInviteService.postInvitedVendors(tenderId, { partners: JSON.stringify(vendors)}).pipe(delay(1500)).subscribe(
            (response) => {
                this.closeModal();
                response.code === 200 ? this.redirectToInviteSuccess(tenderId) : this.redirectToInviteFailed(tenderId);
            },
            () => {
                this.closeModal();
                this.redirectToInviteFailed(tenderId);
            }
        );
    }

    openLoadingModal() {
        let data: { image: string, title: string, text: string};

        data = {
            image: 'assets/svg/envelop.svg',
            title: 'Sending Invitation',
            text: 'Please wait few moments, we are sending invitation to your selected service providers.'
        };

        this.loadingDialogRef = this.dialog.open(LoadingModalComponent, {
            data,
            maxWidth: '570px',
            minWidth: '570px',
            height: 'auto',
            panelClass: 'dialog-confirmation'
        });
    }

    closeModal() {
        this.loadingDialogRef.close();
    }

    redirectToInviteSuccess(tenderId) {
        this.router.navigate(['/', 'dashboard', 'rfq', 'create', 'invite', 'successful'], {queryParams: { id: tenderId}})
            .then(() => {
                this.rfqInviteStorageService.removeRfqFromStorage();
            });
    }

    redirectToInviteFailed(tenderId) {
        this.router.navigate(['/', 'dashboard', 'rfq', 'create', 'invite', 'failed'], { queryParams: { id: tenderId}});
    }

}
