import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MultidatePickerComponent} from './multidate-picker.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
        MultidatePickerComponent
    ],
    imports: [
        CommonModule,
        NgbModule
    ],
    exports: [
        MultidatePickerComponent
    ]
})
export class MultidatePickerModule { }
