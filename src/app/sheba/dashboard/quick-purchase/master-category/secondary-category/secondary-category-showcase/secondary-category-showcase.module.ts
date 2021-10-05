import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecondaryCategoryShowcaseCardComponent } from './secondary-category-showcase-card/secondary-category-showcase-card.component';

@NgModule({
    declarations: [
        SecondaryCategoryShowcaseCardComponent
    ],
    exports: [
        SecondaryCategoryShowcaseCardComponent
    ],
    imports: [
        CommonModule
    ]
})
export class SecondaryCategoryShowcaseModule { }
