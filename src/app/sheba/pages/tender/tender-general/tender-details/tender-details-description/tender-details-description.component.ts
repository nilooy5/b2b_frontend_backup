import {Component, Input, OnInit} from '@angular/core';
import {NumericFormat} from '../../../../../../helpers/numeric_format.service';

@Component({
    selector: 'app-tender-details-description',
    templateUrl: './tender-details-description.component.html',
    styleUrls: ['./tender-details-description.component.scss']
})
export class TenderDetailsDescriptionComponent implements OnInit {

    @Input() tender;

    constructor(public numericFormat: NumericFormat) {
    }

    ngOnInit() {
    }

    downloadAttachment(link) {
        window.open(link, '_blank');
    }
}
