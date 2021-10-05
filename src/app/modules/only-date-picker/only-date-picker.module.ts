import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OnlyDatePickerComponent} from './only-date-picker.component';
import {
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule
} from "@angular/material";
import {FormsModule} from "@angular/forms";
import {OverlayModule} from "@angular/cdk/overlay";
import {DatePickerComponent} from './date-picker/date-picker.component';
import {DatePickerService} from "./date-picker.service";

@NgModule({
    declarations: [OnlyDatePickerComponent, DatePickerComponent],
    imports: [
        CommonModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        OverlayModule,
        MatButtonModule
    ],
    exports: [OnlyDatePickerComponent],
    entryComponents: [DatePickerComponent],
    providers: [DatePickerService]
})
export class OnlyDatePickerModule {
}
