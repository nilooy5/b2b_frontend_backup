import {Component, OnInit} from '@angular/core';
import {TenderService} from '../../../../../../../services/tender-service/tender.service';
import {ETable} from '../../../../../../../types/general';

@Component({
    selector: 'app-procurement-tender-add-price',
    templateUrl: './procurement-tender-add-price.component.html',
    styleUrls: ['./procurement-tender-add-price.component.scss'],
})
export class ProcurementTenderAddPriceComponent implements OnInit {

    quotation: any[] = [];

    tableInitialData: ETable[] = [
        {
            label: 'SL NO',
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
    constructor(private tenderService: TenderService) {
        this.storedQuotationList = this.tenderService.PriceQuotation ? this.tenderService.PriceQuotation : [];
        this.handlePreviousQuotationList(this.storedQuotationList);
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

    ngOnInit() {
    }

    receivedQuotationList(quotationList) {
        this.quotation = quotationList.map( res => {
            return {
                title: res.itemName,
                short_description: res.specification,
                unit: res.unit,
                is_required: '1',
                type: 'number'
            };
        });
        this.tenderService.PriceQuotation = this.quotation;
    }
}
