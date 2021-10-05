import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SmsSettingsFilterComponent} from './sms-settings-filter.component';

@NgModule({
    declarations: [
        SmsSettingsFilterComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        SmsSettingsFilterComponent
    ]
})
export class SmsSettingsFilterModule { }
