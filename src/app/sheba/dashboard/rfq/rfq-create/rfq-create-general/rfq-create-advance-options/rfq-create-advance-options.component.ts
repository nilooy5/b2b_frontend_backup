import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {RfqStorageService} from '../../../../../../services/rfq-storage-service/rfq-storage.service';
import {StorageService} from '../../../../../../services/storage.service';

interface AdvanceOptions {
    name: string;
    title: string;
    image: string;
    alt: string;
    padding: string;
    hasValue: boolean;
}

@Component({
    selector: 'app-rfq-create-advance-options',
    templateUrl: './rfq-create-advance-options.component.html',
    styleUrls: ['./rfq-create-advance-options.component.scss']
})

export class RfqCreateAdvanceOptionsComponent implements OnInit {

    advanceOptions = {
        attachments: {
            name: 'attachment',
            title: 'Add Attachments',
            image: './assets/svg/icons/rfq/attachment.svg',
            alt: 'Attachments',
            padding: '0 15px',
            hasValue: false
        },
        companyEvaluation: {
            name: 'company',
            title: 'Ask for Company Evaluation',
            image: './assets/svg/icons/rfq/comp_eval.svg',
            alt: 'Company Evaluation',
            padding: '0 15px 0 5px',
            hasValue: false
        },
        priceQuotation: {
            name: 'price',
            title: 'Ask for Price Quotation',
            image: './assets/svg/icons/rfq/price_quote.svg',
            alt: 'Price Quotation',
            padding: '0 15px',
            hasValue: false
        },
        technicalEvaluation: {
            name: 'technical',
            title: 'Ask for Technical Evaluation',
            image: './assets/svg/icons/rfq/tech_eval.svg',
            alt: 'Technical Evaluation',
            padding: '0 15px 0 5px',
            hasValue: false
        }
    };

    @Output() showAttachment: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private router: Router,
                private storageService: StorageService,
                private rfqStorageService: RfqStorageService) {
        this.handlePreviousData();
        this.updateAttachmentIconOnStorageChange();

    }

    ngOnInit() { }

    option(optionName: string) {
        const baseRoute = '/dashboard/rfq/create';
        switch (optionName) {
            case 'attachment':
                this.showAttachment.emit(true);
                break;
            case 'price':
                this.router.navigate([baseRoute, 'price']);
                break;
            case 'technical':
                this.router.navigate([baseRoute, 'evaluation', 'technical']);
                break;
            case 'company':
                this.router.navigate([baseRoute, 'evaluation', 'company']);
                break;
        }
    }

    handlePreviousData() {
        this.advanceOptions['attachments'].hasValue = !!(this.rfqStorageService.Attachments && this.rfqStorageService.Attachments.length);
        this.advanceOptions['priceQuotation'].hasValue = !!(this.rfqStorageService.PriceQuotation && this.rfqStorageService.PriceQuotation.length);
        this.advanceOptions['technicalEvaluation'].hasValue = !!(this.rfqStorageService.TechnicalEvaluation && this.rfqStorageService.TechnicalEvaluation.length);
        this.advanceOptions['companyEvaluation'].hasValue = !!(this.rfqStorageService.CompanyEvaluation && this.rfqStorageService.CompanyEvaluation.length);
    }

    updateAttachmentIconOnStorageChange() {
        this.storageService.watchStorage().subscribe(res => {
            this.advanceOptions['attachments'].hasValue = !!(res.attachments && res.attachments.length);
        });
    }

}
