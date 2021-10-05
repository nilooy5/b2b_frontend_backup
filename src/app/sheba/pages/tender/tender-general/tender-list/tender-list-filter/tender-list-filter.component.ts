import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {TenderFilterCategory, TenderFilteredOptions, TenderFilterPostType, TenderFilterTags, TenderListFilterOptions} from '../../../../../../types/tender';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {NumericFormat} from '../../../../../../helpers/numeric_format.service';
import {Options} from 'ng5-slider';
import {debounceTime} from 'rxjs/operators';
import {log} from 'util';
import * as moment from 'moment';
import {Log} from '@angular/core/testing/src/logger';

@Component({
    selector: 'app-tender-list-filter',
    templateUrl: './tender-list-filter.component.html',
    styleUrls: ['./tender-list-filter.component.scss']
})

export class TenderListFilterComponent implements OnInit, OnChanges {

    @Input() tenderListFilterOptions: TenderListFilterOptions;
    @Input() searchValue: string;
    @Input() sortOption: string;
    @Input() pageNumber: number;
    @Input() categoryIdFromParams: any[] = [];
    @Output() filterEmitter = new EventEmitter<any>();

    formGroup: FormGroup;

    categories: TenderFilterCategory[];
    postTypes: TenderFilterPostType[];
    popularTags: TenderFilterTags[];

    budgetRangeForm: FormGroup = new FormGroup({
        budgetRangeControl: new FormControl([0, 100000])
    });

    tenderFilteredOptions: TenderFilteredOptions = {
        page: '',
        q: '',
        sort: 'desc',
        category: '',
        shared_to: '',
        min_price: '',
        max_price: '',
        start_date: '',
        end_date: '',
        tag: ''
    };

    // Budget Slider Options
    budgetSliderOptions: Options = {
        floor: 0,
        ceil: 100000,
        hidePointerLabels: true,
        hideLimitLabels: true
    };

    // Categories
    isAllCategoriesDisabled = true;
    isAllCategoriesChecked = true;
    testCategories = false;
    moreCategoriesText = 'View More Categories';

    // Post Types
    isAllPostTypeDisabled = true;
    isAllPostTypeChecked = true;

    deliveryTimeline = {
        startDate: moment(),
        endDate: moment().add('1', 'months')
    };

    selectedTags = [];

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.setFilterOptions();
        this.watchBudgetSliderChange();
        this.constructFormGroup();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.searchValue && changes.searchValue.currentValue !== undefined) {
            this.searchInputChanges(changes.searchValue.currentValue);
        }
        if (changes.sortOption && changes.sortOption.currentValue !== undefined) {
            this.sortOptionChanges(changes.sortOption.currentValue);
        }
        if (changes.pageNumber && changes.pageNumber.currentValue !== undefined) {
            this.pageNumberChanges(changes.pageNumber.currentValue);
        }
    }

    setFilterOptions() {
        this.categories = this.tenderListFilterOptions.categories;
        this.postTypes = this.tenderListFilterOptions.post_type;
        this.popularTags = this.tenderListFilterOptions.popular_tags;
    }

    constructFormGroup() {
        this.formGroup = this.formBuilder.group({
            categories: this.formBuilder.array(this.categories.map((x) => {
                if (this.categoryIdFromParams.length > 0) {
                    if (this.categoryIdFromParams.indexOf(x.id) > -1) {
                        this.showCategoriesMore();
                        this.isAllCategoriesChecked = false;
                        this.isAllCategoriesDisabled = false;
                        return this.categoryIdFromParams.indexOf(x.id) > -1;
                    }
                }
                return !1;
            })),
            postTypes: this.formBuilder.array(this.postTypes.map(() => !1))
        });
    }

    showCategoriesMore() {
        if (this.testCategories === false && this.moreCategoriesText === 'View More Categories') {
            this.testCategories = true;
            this.moreCategoriesText = 'View Less Categories';
            return;
        }
        this.testCategories = false;
        this.moreCategoriesText = 'View More Categories';
        window.scroll(0, 0);
    }

    // Category
    changeCategory(type: string) {
        if (type === 'all' && !this.isAllCategoriesChecked) {
            this.selectAll('isAllCategoriesChecked', 'isAllCategoriesDisabled', 'category');
        }

        if (type === 'category') {
            this.selectedOptions('isAllCategoriesChecked', 'isAllCategoriesDisabled', 'category', 'categories', 'id');
        }
    }

    // Post Type
    chancePostType(type: string) {
        if (type === 'all' && !this.isAllPostTypeChecked) {
            this.selectAll('isAllPostTypeChecked', 'isAllPostTypeDisabled', 'shared_to');
        }

        if (type === 'postType') {
            this.selectedOptions('isAllPostTypeChecked', 'isAllPostTypeDisabled', 'shared_to', 'postTypes', 'key');
        }
    }

    filterSelectedFormControlOptions(formControl: string, key) {
        return this.formGroup.value[formControl].map((x, i) => x && this[formControl][i][key]).filter(x => !!x);
    }

    selectAll(checkedProperty: string, disabledProperty: string, filterOption: string) {
        this[checkedProperty] = true;
        this[disabledProperty] = true;
        this.formGroup.reset();
        this.tenderFilteredOptions[filterOption] = '';
        this.resetPagination();
        this.emitFilterOptions();
    }

    selectedOptions(checkedProperty: string, disabledProperty: string, filterOption: string, formControlName: string, key: string) {
        this[checkedProperty] = false;
        this[disabledProperty] = false;
        this.tenderFilteredOptions[filterOption] = this.filterSelectedFormControlOptions(formControlName, key);
        if (this.tenderFilteredOptions[filterOption].length === 0) {
            this[checkedProperty] = true;
            this[disabledProperty] = true;
            this.emitFilterOptions();
        } else {
            this.resetPagination();
            this.emitFilterOptions();
        }
    }

    // Budget Slider
    watchBudgetSliderChange() {
        this.budgetRangeForm.valueChanges
            .pipe(debounceTime(500))
            .subscribe(({ budgetRangeControl }) => {
                this.tenderFilteredOptions.min_price = budgetRangeControl[0];
                this.tenderFilteredOptions.max_price = budgetRangeControl[1];
                this.resetPagination();
                this.emitFilterOptions();
            });
    }

    // Delivery Timeline
    handleDeliveryTimeline(event: any) {
        this.tenderFilteredOptions.start_date = moment(event.startDate).format('YYYY-MM-DD');
        this.tenderFilteredOptions.end_date = moment(event.endDate).format('YYYY-MM-DD');
        this.resetPagination();
        this.emitFilterOptions();
    }

    // Tags
    onSelectTag(tag: TenderFilterTags) {
        const index = this.selectedTags.findIndex((item) => item === tag.id);
        if (index === -1) {
            this.selectedTags.push(tag.id);
        } else {
            this.selectedTags.splice(index, 1);
        }
        this.tenderFilteredOptions.tag = this.selectedTags;
        this.resetPagination();
        this.emitFilterOptions();
    }

    // Sorting
    sortOptionChanges(value) {
        this.tenderFilteredOptions.sort = value;
        this.resetPagination();
        this.emitFilterOptions();
    }

    // Pagination
    pageNumberChanges(pageNumber: number|string) {
        this.tenderFilteredOptions.page = pageNumber;
        this.emitFilterOptions();
    }

    // Search
    searchInputChanges(value) {
        this.tenderFilteredOptions.q = value;
        this.resetPagination();
        this.emitFilterOptions();
    }

    // Reset Filter
    resetFilter() {
        this.isAllCategoriesChecked = true;
        this.isAllPostTypeChecked = true;
        this.formGroup.reset();

        this.deliveryTimeline = {
            startDate: moment(),
            endDate: moment().add('1', 'months')
        };
        this.selectedTags = [];

        this.tenderFilteredOptions = {
            ...this.tenderFilteredOptions,
            category: '',
            shared_to: '',
            start_date: '',
            end_date: '',
            tag: ''
        };

        this.budgetRangeForm.patchValue({
            budgetRangeControl: [0, 100000]
        });
        // emitFilterOptions() function is getting called in watchBudgetSliderChange() function;
    }

    // Reset Pagination on change of Filter Option
    resetPagination() {
        this.tenderFilteredOptions.page = 1;
    }

    emitFilterOptions() {
        this.filterEmitter.emit(this.tenderFilteredOptions);
    }

}
