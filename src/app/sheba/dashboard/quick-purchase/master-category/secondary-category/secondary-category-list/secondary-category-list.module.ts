import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecondaryCategoryListCardComponent } from './secondary-category-list-card/secondary-category-list-card.component';

@NgModule({
    declarations: [
        SecondaryCategoryListCardComponent
    ],
    exports: [
        SecondaryCategoryListCardComponent
    ],
    imports: [
        CommonModule
    ]
})
export class SecondaryCategoryListModule { }
