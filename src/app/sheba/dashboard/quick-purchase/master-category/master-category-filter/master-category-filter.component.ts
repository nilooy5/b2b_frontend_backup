import {AfterContentInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SelectedMasterCategoryService} from '../selected-master-category.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-master-category-filter',
    templateUrl: './master-category-filter.component.html',
    styleUrls: ['./master-category-filter.component.scss']
})
export class MasterCategoryFilterComponent implements OnInit {
    selectedCategory: string;

    @Input() masterCategories: any;
    @Input() activeCategory: any;
    @Output() updateSelectedCategory = new EventEmitter<any>();


    constructor(
        private selectedMasterCategory: SelectedMasterCategoryService,
        private route: ActivatedRoute
    ) {
        this.selectedCategory = this.route.snapshot.queryParams.category;
    }

    ngOnInit() {
        if (this.selectedCategory) {
            this.clickMasterCategory(parseInt(this.selectedCategory));
        } else {
            if (this.masterCategories) {
                const firstElement = this.masterCategories.find(x => x !== undefined);
                this.selectedMasterCategory.changeSelectedMasterCatgory(firstElement.id);
            }
        }
    }

    clickMasterCategory(id) {
        this.updateSelectedCategory.emit(id);
        this.selectedMasterCategory.changeSelectedMasterCatgory(id);
    }

}
