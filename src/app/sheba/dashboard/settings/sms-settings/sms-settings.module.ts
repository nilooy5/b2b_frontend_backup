import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SmsSettingsRoutingModule } from './sms-settings-routing.module';
import {SmsSettingsComponent} from './sms-settings.component';
import {MatDialogModule, MatSlideToggleModule, MatTableModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {SmsSettingsEditModule} from './sms-settings-edit/sms-settings-edit.module';
import {SmsSettingsFilterModule} from './sms-settings-filter/sms-settings-filter.module';

@NgModule({
    declarations: [
        SmsSettingsComponent
    ],
    imports: [
        CommonModule,
        SmsSettingsRoutingModule,
        MatTableModule,
        FormsModule,
        MatSlideToggleModule,
        MatDialogModule,
        SmsSettingsEditModule,
        SmsSettingsFilterModule
    ]
})
export class SmsSettingsModule { }
