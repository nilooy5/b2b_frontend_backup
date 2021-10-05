import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FinancialInfo } from '../../../../../../types/co-workers';

@Component({
    selector: 'app-co-workers-details-financial',
    templateUrl: './co-workers-details-financial.component.html',
    styleUrls: ['./co-workers-details-financial.component.scss']
})

export class CoWorkersDetailsFinancialComponent {

    financialInfo: { label: string; info: string; downloadable: boolean }[] = [];
    tinCertificate: string;

    constructor(private activatedRoute: ActivatedRoute) {
        activatedRoute.parent.data.subscribe(({ coWorkerDetails }) => {
            this.pushEmergencyInfoIntoArray(coWorkerDetails.financial_info);
            this.tinCertificate = coWorkerDetails.financial_info.tin_certificate;
        });
    }

    pushEmergencyInfoIntoArray(financialInfo: FinancialInfo) {
        this.financialInfo.push(
            {
                label: 'TIN',
                info: financialInfo.tin_no ? financialInfo.tin_no : 'N/A',
                downloadable: !!financialInfo.tin_certificate
            },
            {
                label: 'Bank Name',
                info: financialInfo.bank_name ? financialInfo.bank_name : 'N/A',
                downloadable: false
            },
            {
                label: 'Bank Account No.',
                info: financialInfo.account_no ? financialInfo.account_no : 'N/A',
                downloadable: false
            }
        );
    }

}
