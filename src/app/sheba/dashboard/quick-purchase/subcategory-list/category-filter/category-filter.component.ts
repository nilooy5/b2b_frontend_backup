import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-category-filter',
    templateUrl: './category-filter.component.html',
    styleUrls: ['./category-filter.component.scss']
})
export class CategoryFilterComponent implements OnInit {

    @Output() filter = new EventEmitter<any>();

    public searchKey = '';
    public selectedCategory = 0;

    private form: FormGroup;
    @Input() categories: any[] = [];

    constructor() {
    }

    ngOnInit() {
    }

    selectCategory(e) {
        this.selectedCategory = e.target.value;
        this.emitFilter();
    }

    onChange(e) {
        this.searchKey = e.target.value;
        this.emitFilter();
    }

    emitFilter() {
        this.filter.emit({
            category: this.selectedCategory,
            key: this.searchKey
        });
    }

}
