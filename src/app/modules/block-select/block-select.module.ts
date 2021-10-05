import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BlockSelectComponent} from './block-select/block-select.component';
import {FormsModule} from "@angular/forms";

@NgModule({
    declarations: [BlockSelectComponent],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [BlockSelectComponent]
})
export class BlockSelectModule {
}
