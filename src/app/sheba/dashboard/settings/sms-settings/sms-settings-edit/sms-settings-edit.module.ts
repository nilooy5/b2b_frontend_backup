import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SmsSettingsEditComponent} from './sms-settings-edit.component';
import {MatDialogModule, MatSlideToggleModule, MatTooltipModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormDirectivesModule} from '../../../../../directives/form-directives/form-directives.module';

@NgModule({
    declarations: [
        SmsSettingsEditComponent
    ],
    imports: [
        CommonModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
        FormDirectivesModule,
        MatSlideToggleModule,
        MatTooltipModule
    ],
    exports: [
        SmsSettingsEditComponent
    ],
    entryComponents: [
        SmsSettingsEditComponent
    ]
})
export class SmsSettingsEditModule { }
