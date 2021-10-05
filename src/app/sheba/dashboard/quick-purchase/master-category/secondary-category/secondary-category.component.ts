import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {SelectedMasterCategoryService} from '../selected-master-category.service';
import {SearchInputService} from '../../search-input.service';
import {delay} from 'rxjs/operators';

@Component({
    selector: 'app-secondary-category',
    templateUrl: './secondary-category.component.html',
    styleUrls: ['./secondary-category.component.scss']
})
export class SecondaryCategoryComponent implements OnInit {

    @Input() masterCategories: any;
    categories: [];

    constructor(private selectedMaterCategory: SelectedMasterCategoryService,
                private searchInput: SearchInputService) {
    }

    ngOnInit() {
        this.selectedMaterCategory.currentSelectedMaterCategory.pipe(delay(500)).subscribe(res => {
            if (res === 0) {
                this.categories = [];
                return;
            }
            this.categories = this.masterCategories.filter((item) => {
                return item.id === res;
            });
        });
    }
}
