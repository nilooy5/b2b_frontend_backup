import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterCategoryComponent } from './master-category.component';
import { MasterCategoryRoutingModule } from './master-category-routing.module';
import { MasterCategoryFilterComponent } from './master-category-filter/master-category-filter.component';
import { SecondaryCategoryComponent } from './secondary-category/secondary-category.component';
import {SecondaryCategoryModule} from './secondary-category/secondary-category.module';

@NgModule({
    declarations: [
        MasterCategoryComponent,
        SecondaryCategoryComponent,
        MasterCategoryFilterComponent
    ],
    imports: [
        CommonModule,
        MasterCategoryRoutingModule,
        SecondaryCategoryModule
    ]
})

export class MasterCategoryModule { }
