import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PageEvent} from "@angular/material";

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
    @Input() total: number = 0;
    @Input() pageSize: number = 0;
    @Input() currentPage: number = 1;
    @Output() pageEvent: EventEmitter<PageEvent> = new EventEmitter();
    @Input() showPageNumbers: boolean = false;
    @Input() showRecordNumber: boolean = true;

    constructor() {
    }

    ngOnInit() {
    }

    _getTotalText() {
        return this.total > 1 ? `${this.total} records found` : `${this.total} record found`;
    }

    next() {
        this.currentPage++;
        this.generatePageEvent();
    }

    previous() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.generatePageEvent();
        }
    }

    generatePageEvent() {
        this.pageEvent.emit({
            pageIndex: this.currentPage - 1,
            length: 20,
            pageSize: 20,
            previousPageIndex: this.currentPage - 2
        })
    }
}
