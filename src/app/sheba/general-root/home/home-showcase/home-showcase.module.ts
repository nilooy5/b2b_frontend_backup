import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeShowcaseComponent} from './home-showcase.component';

@NgModule({
    declarations: [
        HomeShowcaseComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        HomeShowcaseComponent
    ]
})
export class HomeShowcaseModule {
}
