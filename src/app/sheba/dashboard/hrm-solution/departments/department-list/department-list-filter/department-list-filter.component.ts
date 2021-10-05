import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-department-list-filter',
  templateUrl: './department-list-filter.component.html',
  styleUrls: ['./department-list-filter.component.scss']
})
export class DepartmentListFilterComponent implements OnInit {

    filter: any;
    @Input() departments: any[];
    @Output() filterEmitter: EventEmitter<any> = new EventEmitter();
    @Output() searchEmitter: EventEmitter<any> = new EventEmitter();
    @Output() sortEmitter: EventEmitter<any> = new EventEmitter();
    @Output() addEmitter: EventEmitter<any> = new EventEmitter();

    constructor(
        private router: Router,
    ) {
        this.filter = {
            page: 0
        };
    }

    ngOnInit() {
    }

    search(key) {
        this.searchEmitter.emit(key.target.value);
    }

    selectSort(sort) {
        this.sortEmitter.emit(sort.target.value);
    }

    addItem() {
        this.addEmitter.emit();
    }

    nextPage() {
        this.filter.page = this.filter.page += 10;
        this.filterEmitter.emit(this.filter);
    }

    PreviousPage() {
        if (this.filter.page > 1) {
            this.filter.page =  this.filter.page -= 10;
            this.filterEmitter.emit(this.filter);
        }
    }

}
