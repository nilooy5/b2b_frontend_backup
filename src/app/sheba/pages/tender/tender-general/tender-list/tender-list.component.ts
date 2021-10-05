import { Component, OnInit } from '@angular/core';
import { ShebaHttpService } from '../../../../../modules/sheba-http/sheba-http.service';
import { ActivatedRoute } from '@angular/router';
import {TenderList, TenderListFilterOptions, TenderListPagination} from '../../../../../types/tender';
import { FormControl } from '@angular/forms';
import {debounceTime, map} from 'rxjs/operators';
import { MatSelectChange } from '@angular/material';
import {TenderListService} from '../../tender-services/tender-list.service';
import {environment} from '../../../../../../environments/environment';

@Component({
    selector: 'app-tender-list',
    templateUrl: './tender-list.component.html',
    styleUrls: ['./tender-list.component.scss']
})

export class TenderListComponent implements OnInit {

    filterIcon = environment.s3_url + 'icons/filter.svg';

    viewSwitch = 'list';

    tenderList: TenderList[];
    tenderListFilterOptions: TenderListFilterOptions;
    tenderListPagination: TenderListPagination;
    totalTenderListCount: number;

    searchFormControl = new FormControl();
    searchValue: string;
    selectedSortOption: string;
    selectedPageNumber: number;
    categoryIdFromParams = [];

    constructor(private activatedRoute: ActivatedRoute,
                private tenderListService: TenderListService,
                private http: ShebaHttpService) {
        if (window.history.state.categoryId) {
            this.categoryIdFromParams.push(parseInt(window.history.state.categoryId));
            this.setFilteredTenderList({ category: this.categoryIdFromParams, page: 1 });
        }
        this.apiResolvedData();
    }

    ngOnInit() {
        this.watchSearchInputChanges();
    }

    toggleView(selectedView) {
        this.viewSwitch = selectedView;
    }

    apiResolvedData() {
        this.activatedRoute.data.subscribe(({ tenderList }) => {
            const [{ tenders }, { filter_options }] = tenderList;
            this.setTenderList(tenders.data, tenders.total);
            this.setTenderListPagination(tenders);
            this.setTenderListFilterOptions(filter_options);
        });
    }

    setTenderList(tenders: TenderList[], totalTenderList: number) {
        this.tenderList = tenders;
        this.totalTenderListCount = totalTenderList;
    }

    setTenderListPagination(tenders) {
        this.tenderListPagination = {
            current_page: tenders.current_page,
            total_tenders: tenders.total
        };
    }

    setTenderListFilterOptions(options: TenderListFilterOptions) {
        this.tenderListFilterOptions = options;
    }

    setFilteredTenderList(filter) {
        const filterParams = {
            ...filter,
            category: filter.category && filter.category.length ? JSON.stringify(filter.category) : '',
            shared_to: filter.shared_to && filter.shared_to.length ? JSON.stringify(filter.shared_to) : '',
            tag: filter.tag && filter.tag.length ? JSON.stringify(filter.tag) : ''
        };
        this.getFilteredTenders(filterParams);
    }

    getFilteredTenders(filters) {
        this.tenderListService.getFilteredTenders(filters).subscribe(filteredTenderList => {
            const { tenders } = filteredTenderList;
            this.setTenderList(tenders.data, tenders.total);
            this.setTenderListPagination(tenders);
        });
    }

    watchSearchInputChanges() {
        this.searchFormControl.valueChanges
            .pipe(debounceTime(500))
            .subscribe((value) => {
                this.searchValue = value;
            });
    }

    onChangeSortSelection(event: MatSelectChange) {
        this.selectedSortOption = event.value;
    }

    handlePagination(pageNumber: number) {
        this.selectedPageNumber = pageNumber;
        window.scroll(0, 0);
    }
}
