import {AfterContentInit, Component, ContentChild, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-table-filter',
    templateUrl: './table-filter.component.html',
    styleUrls: ['./table-filter.component.scss'],
    exportAs: 'AppTableFilter'
})
export class TableFilterComponent implements OnInit, AfterContentInit {
    public open: boolean;
    @Input() heading: string = 'Table Filter';

    constructor() {
    }

    ngOnInit() {
    }

    ngAfterContentInit(): void {
    }

    public toggleOpen(event: any) {
        this.open = !this.open;
    }

}
