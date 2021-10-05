import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecondaryCategoryShowcaseComponent } from './secondary-category-showcase/secondary-category-showcase.component';
import { SecondaryCategoryListComponent } from './secondary-category-list/secondary-category-list.component';
import {SecondaryCategoryShowcaseModule} from './secondary-category-showcase/secondary-category-showcase.module';
import {SecondaryCategoryListModule} from './secondary-category-list/secondary-category-list.module';

@NgModule({
    declarations: [
        SecondaryCategoryShowcaseComponent,
        SecondaryCategoryListComponent
    ],
    exports: [
        SecondaryCategoryShowcaseComponent,
        SecondaryCategoryListComponent
    ],
    imports: [
        CommonModule,
        SecondaryCategoryShowcaseModule,
        SecondaryCategoryListModule
    ]
})

export class SecondaryCategoryModule { }
