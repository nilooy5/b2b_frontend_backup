import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgSimpleSliderComponent} from './ng-simple-slider.component';

@NgModule({
    declarations: [
        NgSimpleSliderComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        NgSimpleSliderComponent
    ]
})
export class NgSimpleSliderModule { }
