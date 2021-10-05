import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SettingsApprovalComponent} from './settings-approval.component';
import {SettingsApprovalRoutingModule} from './settings-approval-routing.module';
import {ApprovalFormComponent} from './approval-form/approval-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SelectPickerWithSearchModule} from '../../../../modules/select-picker-with-search/select-picker-with-search.module';
import {MatFormFieldModule} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
    declarations: [
        SettingsApprovalComponent,
        ApprovalFormComponent
    ],
    exports: [
        ApprovalFormComponent
    ],
    imports: [
        CommonModule,
        SettingsApprovalRoutingModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        SelectPickerWithSearchModule
    ]
})
export class SettingsApprovalModule {
}
