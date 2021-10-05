import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {appConfig} from "../../../config/app.config";

@Component({
    selector: 'app-list-select',
    templateUrl: './list-select.component.html',
    styleUrls: ['./list-select.component.scss']
})
export class ListSelectComponent implements OnInit, OnChanges {
    @Input() title: string = 'List Select';
    @Input() bindTitle: string = 'name';
    @Input() bindSubTitle: string = 'mobile';
    @Input() bindValue: string = 'id';
    @Input() bindImage: string;
    @Input() listData: any[] = [];
    @Output() OnSearch: EventEmitter<any> = new EventEmitter();
    @Output() OnSelect: EventEmitter<any> = new EventEmitter();
    @Input() localSearch: boolean = true;
    query: string;
    appConfig = appConfig;
    selectedItem: any;
    data: any[];

    constructor() {
    }

    ngOnInit() {
        this.data = this.listData && this.listData.length ? this.listData : [];
    }

    onSearch() {
        if (!this.localSearch) {
            this.OnSearch.emit(this.query);
        } else {
            this.selectedItem = null;
            this.OnSelect.emit(null);
            this.filterData();
        }
    }

    filterData() {
        if (this.query) {
            this.data = this.listData.filter((item) => {
                const titleMatch = item[this.bindTitle].toLowerCase().indexOf(this.query.toLowerCase()) >= 0;
                const subTitleMatch = item[this.bindSubTitle].toLowerCase().indexOf(this.query.toLowerCase()) >= 0;
                return titleMatch || subTitleMatch;
            })
        } else {
            this.data = this.listData;
        }
    }

    onSelect() {
        this.OnSelect.emit(this.selectedItem);
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log(changes);
    }
}
