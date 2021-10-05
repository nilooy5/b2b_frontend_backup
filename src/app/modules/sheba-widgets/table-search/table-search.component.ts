import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-table-search',
    templateUrl: './table-search.component.html',
    styleUrls: ['./table-search.component.scss']
})
export class TableSearchComponent implements OnInit {
    open: boolean;
    query: string;
    @Output() onSearched = new EventEmitter<string>();
    @Input() placeholder = 'Search';
    @Input() tooltip = 'Search';

    constructor() {
    }

    ngOnInit() {
    }

    submit() {
        if(this.query)
            this.onSearched.emit(this.query);
    }

    toggle() {
        this.open = !this.open;
        this.query = '';
        if (!this.open) {
            this.query = '';
            this.onSearched.emit(null);
        }
    }
}
