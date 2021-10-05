import { Component, OnDestroy } from '@angular/core';
import { Breadcrumb } from '../../../../../types/general';
import { DashboardSharedService } from '../../../../../services/dashboard-shared.service';
import { RfqStorageService } from '../../../../../services/rfq-storage-service/rfq-storage.service';

@Component({
    selector: 'app-rfq-create-general',
    templateUrl: './rfq-create-general.component.html',
    styleUrls: ['./rfq-create-general.component.scss']
})

export class RfqCreateGeneralComponent implements OnDestroy {

    breadcrumb: Breadcrumb[] = [
        {
            title: 'Request for quotation',
            path: '/dashboard/rfq/create'
        },
        {
            title: 'Create new',
            isActive: true
        }
    ];

    showAttachment = false;
    showScoreBoard = false;

    constructor(private rfqStorageService: RfqStorageService,
                private dashboardSharedService: DashboardSharedService) {
        this.initializeBreadcrumb();
        this.checkAttachmentStorage();
        this.checkRfqBasicInfoStorage();
    }

    initializeBreadcrumb() {
        this.dashboardSharedService.changeBreadcrumb(true, this.breadcrumb);
    }

    checkAttachmentStorage() {
        this.showScoreBoard = this.showAttachment = !!(this.rfqStorageService.Attachments && this.rfqStorageService.Attachments.length);
    }

    checkRfqBasicInfoStorage() {
        if (this.rfqStorageService.BasicInformation) {
            if (this.rfqStorageService.BasicInformation.title) {
                this.showScoreBoard = true;
            }
            if (this.rfqStorageService.BasicInformation.description) {
                this.showScoreBoard = true;
            }
            if (this.rfqStorageService.BasicInformation.budget) {
                this.showScoreBoard = true;
            }
            if (this.rfqStorageService.BasicInformation.tags && this.rfqStorageService.BasicInformation.tags.length > 0) {
                this.showScoreBoard = true;
            }
        }
    }

    handleAttachmentView(show: boolean) {
        this.showAttachment = show;
    }

    handleScoreBoardView() {
        this.showScoreBoard = true;
    }

    ngOnDestroy() {
        this.dashboardSharedService.changeBreadcrumb(false);
    }

}
