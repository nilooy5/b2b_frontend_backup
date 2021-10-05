import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT, Location} from '@angular/common';
import {WINDOW} from '@ng-toolkit/universal';
import {interval, of} from 'rxjs';
import {delay} from 'rxjs/operators';

@Component({
    selector: 'app-procurement-tender-add-summary-invoice',
    templateUrl: './procurement-tender-add-summary-invoice.component.html',
    styleUrls: ['./procurement-tender-add-summary-invoice.component.scss']
})
export class ProcurementTenderAddSummaryInvoiceComponent implements OnInit, AfterViewInit {

    constructor(
        @Inject(DOCUMENT) private document: Document,
        @Inject(WINDOW) private window: Window,
        private location: Location
    ) {
    }

    ngOnInit() {

    }

    ngAfterViewInit(): void {
        let windowClosed = false;
        const sub = interval(1000).pipe(delay(1000)).subscribe(res => {
            const w = this.window;
            if (w) {
                w.print();
                sub.unsubscribe();
                this.location.back();
            }
        });
    }

}
