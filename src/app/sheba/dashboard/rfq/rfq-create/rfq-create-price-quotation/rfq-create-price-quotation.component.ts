import {Component, OnDestroy, OnInit} from '@angular/core';
import {Breadcrumb, ETable} from '../../../../../types/general';
import {RfqStorageService} from '../../../../../services/rfq-storage-service/rfq-storage.service';
import {Router} from '@angular/router';
import {DashboardSharedService} from '../../../../../services/dashboard-shared.service';
import {RfqCreateSharedService} from '../../rfq-services/rfq-create-services/rfq-create-shared.service';

@Component({
    selector: 'app-rfq-create-price-quotation',
    templateUrl: './rfq-create-price-quotation.component.html',
    styleUrls: ['./rfq-create-price-quotation.component.scss']
})

export class RfqCreatePriceQuotationComponent implements OnDestroy {
    quotation: any[] = [];
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
            title: 'Price Quotation',
            isActive: true
        }
    ];

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

    storedQuotationList: any[] = [];

    constructor(private rfqStorageService: RfqStorageService,
                private rfqCreateSharedService: RfqCreateSharedService,
                private dashboardSharedService: DashboardSharedService,
                private router: Router) {
        this.dashboardSharedService.changeBreadcrumb(true, this.breadcrumb);
        this.storedQuotationList = this.rfqStorageService.PriceQuotation ? this.rfqStorageService.PriceQuotation : [];
        this.handlePreviousQuotationList(this.storedQuotationList);
        this.storePriceQuotation();
    }


    ngOnDestroy() {
        this.dashboardSharedService.changeBreadcrumb(false);
    }

    handlePreviousQuotationList(quotations) {
        if (quotations) {
            this.storedQuotationList = this.storedQuotationList.map((item) => {
                return {
                    itemName: item.title,
                    specification: item.short_description,
                    unit: item.unit
                };
            });
        } else {
            console.error('Error');
        }
    }

    receivedQuotationList(quotationList) {
        if (quotationList.length) {
            this.quotation = quotationList.map(res => {
                return {
                    title: res.itemName,
                    type: 'number',
                    short_description: res.specification,
                    unit: res.unit
                };
            });
        }
    }

    storePriceQuotation() {
        this.rfqCreateSharedService.currentJourneySubmitStatus.subscribe((res) => {
            if (res.route === 'price') {
                this.rfqStorageService.PriceQuotation = this.quotation && this.quotation.length ? this.quotation : null;
                this.router.navigate(['/', 'dashboard', 'rfq', 'create']);
            }
        });
    }
}
