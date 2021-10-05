import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AmplitudeService} from '../../../../services/amplitude.service';
import {StorageService} from '../../../../services/storage.service';
import {SearchInputService} from '../search-input.service';
import {SelectedMasterCategoryService} from './selected-master-category.service';
import {OrderService} from '../../../../services/order-service/order.service';

@Component({
    selector: 'app-master-category',
    templateUrl: './master-category.component.html',
    styleUrls: ['./master-category.component.scss']
})
export class MasterCategoryComponent implements OnInit {

    masterCategories;
    filteredMasterCategories;
    selectedFirstMasterCategory;

    notFound = false;

    constructor(
        private route: ActivatedRoute,
        private amplitude: AmplitudeService,
        private searchInput: SearchInputService,
        private storage: StorageService,
        private orderService: OrderService,
        private selectedMasterCategory: SelectedMasterCategoryService
    ) {
        this.route.data.subscribe(res => {
            if (res.categories) {
                this.masterCategories = res.categories;
                this.filteredMasterCategories = this.masterCategories;
                this.filterCategories('');
                const firstElement = res.categories.find(item => item !== undefined);
                this.selectedFirstMasterCategory = firstElement.id;
            } else {
                this.notFound = true;
            }

        });

        this.amplitude.fireCustomEvent(this.amplitude.events.quick_purchase, {
            business_id: this.storage.user.business_id,
            name: this.storage.user.name
        });

        this.searchInput.currentSearchInput.subscribe(res => {
            this.filterCategories(res);
        });
    }

    ngOnInit() {
        this.orderService.resetStorage();
    }


    receiveActiveCategory(event) {
        this.selectedFirstMasterCategory = event;
    }

    filterCategories(search_key) {
        if (this.masterCategories) {
            this.filteredMasterCategories = this.masterCategories.filter((item) => {
                item.filtered_children = item.children.filter((sc) => {
                    if (search_key === '') {
                        return true;
                    }
                    return sc.name.toLowerCase().includes(search_key.toLowerCase());
                });
                return item.filtered_children.length > 0;
            });
        }

        if (this.filteredMasterCategories && this.filteredMasterCategories.length !== 0) {
            this.notFound = false;
            this.receiveActiveCategory(this.filteredMasterCategories[0].id);
            this.selectedMasterCategory.changeSelectedMasterCatgory(this.filteredMasterCategories[0].id);
        } else {
            this.notFound = true;
            this.selectedMasterCategory.changeSelectedMasterCatgory(0);
        }
    }

}
