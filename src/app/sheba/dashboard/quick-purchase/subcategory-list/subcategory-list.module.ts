import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SubcategoryListRoutingModule} from './subcategory-list-routing.module';
import {SubcategoryListComponent} from './subcategory-list.component';
import {CategoryFilterComponent} from './category-filter/category-filter.component';
import {SubcategoryCardComponent} from './subcategory-card/subcategory-card.component';
import {LazyLoadImageModule} from 'ng-lazyload-image';

@NgModule({
    declarations: [SubcategoryListComponent, CategoryFilterComponent, SubcategoryCardComponent],
    imports: [
        CommonModule,
        SubcategoryListRoutingModule,
        LazyLoadImageModule,
        LazyLoadImageModule,
    ]
})
export class SubcategoryListModule {
}
