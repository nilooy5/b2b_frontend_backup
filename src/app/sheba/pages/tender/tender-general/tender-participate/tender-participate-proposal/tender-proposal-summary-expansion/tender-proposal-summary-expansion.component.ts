import { Component, Input } from '@angular/core';
import { NumericFormat } from '../../../../../../../helpers/numeric_format.service';

@Component({
    selector: 'app-tender-proposal-summary-expansion',
    templateUrl: './tender-proposal-summary-expansion.component.html',
    styleUrls: ['./tender-proposal-summary-expansion.component.scss']
})
export class TenderProposalSummaryExpansionComponent  {

    @Input() tenderDetails;

    showDetails = false;

    constructor(public numericFormat: NumericFormat) { }

    toggleDisplay() {
        this.showDetails = !this.showDetails;
        const details = document.getElementById('tenderDetails');
        details.style.display === 'flex' ? details.style.display = 'none' : details.style.display = 'flex';
        /*
        details.style.display === 'flex' ? details.style.display = 'none' : details.style.display = 'flex';
        */
    }

}
