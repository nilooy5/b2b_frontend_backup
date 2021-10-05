import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApprovalDetailsComponent } from './approval-details.component';
import { ApprovalDetailsRoutingModule } from './approval-details-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {SelectPickerWithSearchModule} from '../../../../../modules/select-picker-with-search/select-picker-with-search.module';
import {MatFormFieldModule, MatOptionModule, MatSelectModule} from '@angular/material';
import {SettingsApprovalModule} from '../settings-approval.module';

@NgModule({
    declarations: [
        ApprovalDetailsComponent
    ],
    imports: [
        CommonModule,
        ApprovalDetailsRoutingModule,
        ReactiveFormsModule,
        SelectPickerWithSearchModule,
        MatOptionModule,
        MatFormFieldModule,
        MatSelectModule,
        SettingsApprovalModule
    ]
})

export class ApprovalDetailsModule { }
