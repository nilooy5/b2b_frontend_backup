import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MultiSelectWithSearchComponent} from './multi-select-with-search.component';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

@NgModule({
    declarations: [
        MultiSelectWithSearchComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule
    ],
    exports: [
        MultiSelectWithSearchComponent
    ]
})
export class MultiSelectWithSearchModule { }
