import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-rfq-orders-details-documents',
    templateUrl: './rfq-orders-details-documents.component.html',
    styleUrls: ['./rfq-orders-details-documents.component.scss']
})
export class RfqOrdersDetailsDocumentsComponent implements OnInit {

    @Input() order;

    constructor() {
    }

    ngOnInit() {
    }

    downloadDocument(url: string) {
        window.open(url, '_blank');
    }
}
