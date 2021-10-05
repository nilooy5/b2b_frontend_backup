import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {AdditionalInformation, BasicInformation, Evaluation, ILayoutInfo, PriceQuotation} from '../../../../types/rfq';
import {StorageService} from '../../../../services/storage.service';
import {environment} from '../../../../../environments/environment';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {RfqStorageService} from '../../../../services/rfq-storage-service/rfq-storage.service';
import {DashboardResolveService} from '../../dashboard-resolve.service';
import {Subscription} from 'rxjs';
import {DashboardSharedService} from '../../../../services/dashboard-shared.service';
import {RfqCreateSharedService} from '../rfq-services/rfq-create-services/rfq-create-shared.service';
import {ShebaHttpService} from '../../../../modules/sheba-http/sheba-http.service';
import {ConfirmModalComponent} from '../../../modals/confirm-modal/confirm-modal.component';
import {MatDialog} from '@angular/material';
import {LoadingModalComponent} from '../../../modals/loading-modal/loading-modal.component';
import {RfqCreateService} from '../rfq-services/rfq-create-services/rfq-create.service';
import Lity from 'lity';

@Component({
    selector: 'app-rfq-create',
    templateUrl: './rfq-create.component.html',
    styleUrls: ['./rfq-create.component.scss'],
    providers: [RfqStorageService]
})

export class RfqCreateComponent implements OnInit, OnDestroy {

    toggleSubscription: Subscription;
    isSidebarOpen = false;
    layout: ILayoutInfo;
    currentJourneyState;
    closeResult = '';

    isGeneralInfoDisabled = true;
    // isCompanyDisabled = true;
    // isTechnicalDisabled = true;
    // isPriceQuotationDisabled = true;

    basicInformation: BasicInformation;
    additionalInformation: AdditionalInformation;
    attachments;
    priceQuotation: PriceQuotation[];
    technicalEvaluation: Evaluation[];
    companyEvaluation: Evaluation[];

    tenderSharingTo: string;

    loadingDialogRef;

    arr: any[] = [];

    constructor(private router: Router,
                private rfqCreateService: RfqCreateService,
                private rfqStorageService: RfqStorageService,
                private dashboardService: DashboardResolveService,
                private dashboardSharedService: DashboardSharedService,
                private rfqCreateSharedService: RfqCreateSharedService,
                private modalService: NgbModal,
                private dialog: MatDialog,
                private http: ShebaHttpService,
                private storage: StorageService) {
        this.splitCurrentRouteUrl();
        this.toggleSubscription = this.dashboardService.DashboardBehavior.asObservable().subscribe(res => {
            this.isSidebarOpen = res.open;
        });
        this.rfqStorageService.resetRfqStorage();
        this.dashboardSharedService.changeHeaderTitle('New Tender');
    }

    ngOnInit() {
        this.rfqCreateSharedService.currentJourneyValidationStatus.subscribe(res => {
            if (res) {
                this.setButtonValidationStatus(res);
            }
        });
    }

    ngOnDestroy(): void {
        this.rfqStorageService.removeRfqFromStorage();
        this.toggleSubscription.unsubscribe();
        this.dashboardSharedService.changeHeaderTitle(null);
    }

    splitCurrentRouteUrl() {
        this.router.events.subscribe(e => {
            if (e instanceof NavigationEnd) {
                this.currentJourneyState = e.urlAfterRedirects.split('/')[e.urlAfterRedirects.split('/').length - 1];
                this.currentJourneyState = this.currentJourneyState.split('?')[0];
                this.layout = this.journeyHeaderTitle(this.currentJourneyState);
            }
        });
    }

    journeyHeaderTitle(state: string): ILayoutInfo {
        const currentRoute = {
            create: {
                currentRoute: state,
                headerTitle: 'Request for quotation',
                showHeader: true,
                showFooter: true,
                footerButtonText: 'Post',
                showHelpLink: true,
                applyCSSClass: true
            },
            price: {
                currentRoute: state,
                headerTitle: 'Add Price Quotation',
                showHeader: true,
                showFooter: true,
                footerButtonText: 'Save Price Quotation',
                showHelpLink: true,
                applyCSSClass: true
            },
            technical: {
                currentRoute: state,
                headerTitle: 'Add Technical Evaluation',
                showHeader: true,
                showFooter: true,
                footerButtonText: 'Save Question Set',
                showHelpLink: true,
                applyCSSClass: true
            },
            company: {
                currentRoute: state,
                headerTitle: 'Add Company Evaluation',
                showHeader: true,
                showFooter: true,
                footerButtonText: 'Save Question Set',
                showHelpLink: true,
                applyCSSClass: true
            },
            success: {
                currentRoute: state,
                showHeader: false,
                showFooter: false,
                showHelpLink: true,
                applyCSSClass: true
            },
            invite: {
                currentRoute: state,
                showHeader: false,
                showFooter: false,
                showHelpLink: false,
                applyCSSClass: false
            },
            successful: {
                currentRoute: state,
                showHeader: false,
                showFooter: false,
                showHelpLink: true,
                applyCSSClass: false
            },
            failed: {
                currentRoute: state,
                showHeader: false,
                showFooter: false,
                showHelpLink: true,
                applyCSSClass: false
            }
        };

        return currentRoute[state];
    }

    setButtonValidationStatus(validStatus: string) {
        switch (this.currentJourneyState) {
            case 'create':
                this.isGeneralInfoDisabled = validStatus !== 'valid';
                break;
        }
    }

    open(content) {
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    redirectToHelp() {
        return 'https://www.sheba.xyz/blog/bn/tender-submission-sbusiness/';
    }

    goToCreate() {
        this.router.navigate(['/dashboard/rfq/create']).then();
    }

    saveData() {
        this.rfqCreateSharedService.changeJourneySubmitStatus(this.currentJourneyState);
    }

    submitTender(publishStatus: number) {
        this.getLocalStorageValues();

        const constructedData = this.constructSubmittedData(publishStatus);
        const appendedFormData = this.appendAttachmentIntoForm(constructedData);

        this.postToApi(appendedFormData, publishStatus);
    }

    getLocalStorageValues() {
        this.basicInformation = this.rfqStorageService.BasicInformation;
        this.additionalInformation = this.rfqStorageService.AdditionalInformation;
        this.attachments = this.rfqStorageService.Attachments;
        this.technicalEvaluation = this.rfqStorageService.TechnicalEvaluation;
        this.companyEvaluation = this.rfqStorageService.CompanyEvaluation;
        this.priceQuotation = this.rfqStorageService.PriceQuotation;
        this.tenderSharingTo = this.rfqStorageService.AdditionalInformation.sharing_to;
    }

    constructSubmittedData(isPublished) {
        const title = this.basicInformation.title ? this.basicInformation.title : null;
        const description = this.basicInformation.description;
        const estimated_price = this.basicInformation.budget ? this.basicInformation.budget : null;
        const labels = this.basicInformation.tags.length ? JSON.stringify(this.basicInformation.tags) : null;
        const sharing_to = this.additionalInformation.sharing_to;
        const procurement_start_date = this.additionalInformation.delivery_timeline.start_date;
        const procurement_end_date = this.additionalInformation.delivery_timeline.end_date;
        const last_date_of_submission = this.additionalInformation.last_date_of_submission;
        const number_of_participants = this.additionalInformation.number_of_participants;
        const category_id = this.additionalInformation.category ? this.additionalInformation.category : null;
        const payment_options = this.additionalInformation.payment_option ? this.additionalInformation.payment_option : null;
        const is_published = isPublished;
        const items = this.generateItems();

        const constructedData = Object.assign({},
            title && {title},
            {description},
            estimated_price && {estimated_price},
            labels && {labels},
            {sharing_to},
            {procurement_start_date},
            {procurement_end_date},
            {last_date_of_submission},
            {number_of_participants},
            category_id && {category_id},
            payment_options && {payment_options},
            {is_published},
            items && {items}
        );

        return constructedData;
    }

    appendAttachmentIntoForm(tenderSubmittedData) {
        const formData = new FormData();

        for (const key of Object.keys(tenderSubmittedData)) {
            formData.append(key, tenderSubmittedData[key]);
        }

        // tslint:disable-next-line:prefer-for-of
        if (this.attachments && this.attachments.length) {
            for (let i = 0; i < this.attachments.length; i++) {
                const file = this.dataURLtoFile(this.attachments[i].file, this.attachments[i].name);
                this.arr.push(file);
                formData.append('attachments[]', file);
            }
        }

        return formData;

    }

    dataURLtoFile(dataUrl, filename) {
        const arr = dataUrl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, {type: mime});
    }

    generateItems() {
        const items = [];

        if (this.priceQuotation) {
            items.push({
                item_type: 'price_quotation',
                fields: this.priceQuotation
            });
        }

        if (this.companyEvaluation) {
            items.push({
                item_type: 'company_evaluation',
                fields: this.companyEvaluation
            });
        }

        if (this.technicalEvaluation) {
            items.push({
                item_type: 'technical_evaluation',
                fields: this.technicalEvaluation
            });
        }

        return items.length ? JSON.stringify(items) : null;
    }

    postToApi(data, isPublished) {

        const sharingOption = isPublished === 0 ? 'draft' : this.tenderSharingTo;

        this.openLoadingModal(isPublished);

        this.rfqCreateService.postRfq(data).subscribe(
            (response) => {
                this.loadingDialogRef.close();
                if (response.code === 200) {
                    sharingOption === 'own_listed' ? this.redirectToInvite(response.id) : this.redirectToSuccessRoute(sharingOption, response.id, isPublished, response.share);
                    return;
                }
                this.openErrorModal(response.message);
            },
            () => {
                this.loadingDialogRef.close();
                this.openErrorModal('Something went wrong.');
            }
        );

    }

    openLoadingModal(isPublished) {
        let data: { image: string, title: string, text: string };

        if (isPublished === 0) {
            data = {
                image: 'assets/svg/hourglass.svg',
                title: 'Saving as Draft',
                text: 'Please wait few moments, your RFQ is saving.'
            };
        }

        if (isPublished === 1) {
            data = {
                image: 'assets/svg/hourglass.svg',
                title: 'RFQ is Posting',
                text: 'Please wait few moments, your RFQ is posting.'
            };
        }

        this.loadingDialogRef = this.dialog.open(LoadingModalComponent, {
            data,
            maxWidth: '570px',
            minWidth: '570px',
            height: 'auto',
            panelClass: 'dialog-confirmation'
        });
    }

    openErrorModal($message) {
        const data = {
            type: 'failure',
            title: 'Error!',
            text: $message,
            actionText: 'Close'
        };

        this.dialog.open(ConfirmModalComponent, {
            data,
            maxWidth: '540px',
            height: 'auto',
            panelClass: 'dialog-confirmation'
        });
    }

    playVideo() {
        Lity('https://www.youtube.com/watch?v=t8ewhjC8PyE&autoplay=0');
    }

    redirectToInvite(tenderId) {
        this.router.navigate(['/', 'dashboard', 'rfq', 'create', 'invite'], {state: {showSuccessMessage: true, tenderId}})
            .then(() => {
                this.rfqStorageService.removeRfqFromStorage();
            });
    }

    redirectToSuccessRoute(sharingOption: string, tenderId, publishStatus, publicShareLink?: any,) {
        if (this.tenderSharingTo === 'public' || this.tenderSharingTo === 'verified' || publishStatus === 0) {
            this.router.navigate(['/', 'dashboard', 'rfq', 'create', 'success'], {queryParams: {publish: sharingOption, tenderId, link: publicShareLink.link}})
                .then(() => {
                    this.rfqStorageService.removeRfqFromStorage();
                });
            return;
        }
        this.router.navigate(['/', 'dashboard', 'rfq', 'create', 'success'], {queryParams: {publish: sharingOption, tenderId}})
            .then(() => {
                this.rfqStorageService.removeRfqFromStorage();
            });
    }
}
