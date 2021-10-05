import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApprovalCreateComponent } from './approval-create.component';
import { ApprovalCreateRoutingModule } from './approval-create-routing.module';
import {SelectPickerWithSearchModule} from '../../../../../modules/select-picker-with-search/select-picker-with-search.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule, MatSelectModule} from '@angular/material';
import {SettingsApprovalModule} from '../settings-approval.module';

@NgModule({
    declarations: [
        ApprovalCreateComponent
    ],
    imports: [
        CommonModule,
        ApprovalCreateRoutingModule,
        SelectPickerWithSearchModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        SettingsApprovalModule
    ]
})

export class ApprovalCreateModule { }
