import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {TenderListPagination} from '../../../../../../types/tender';

@Component({
    selector: 'app-tender-list-pagination',
    templateUrl: './tender-list-pagination.component.html',
    styleUrls: ['./tender-list-pagination.component.scss']
})

export class TenderListPaginationComponent implements OnChanges {

    @Input() paginationData: TenderListPagination;
    @Output() pageNumberEmitter: EventEmitter<number> = new EventEmitter<number>();

    page: number;
    totalTenderCount: number;

    constructor() { }

    ngOnChanges(changes: SimpleChanges) {
        // if (changes.paginationData && changes.paginationData.currentValue) {
        //     console.log(changes.paginationData.currentValue);
        // }
    }

    changePage(pageNumber) {
        this.pageNumberEmitter.emit(pageNumber);
    }
}
