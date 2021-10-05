import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcurementTenderDetailFormRoutingModule } from './procurement-tender-detail-form-routing.module';
import {ProcurementTenderDetailFormComponent} from './procurement-tender-detail-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {FormDirectivesModule} from '../../../../../../directives/form-directives/form-directives.module';
import {
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule, MatInputModule,
    MatNativeDateModule,
    MatRadioModule,
    MatTableModule
} from '@angular/material';

@NgModule({
    declarations: [
        ProcurementTenderDetailFormComponent
    ],
    imports: [
        CommonModule,
        ProcurementTenderDetailFormRoutingModule,
        MatTableModule,
        MatRadioModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        FormDirectivesModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatInputModule
    ]
})
export class ProcurementTenderDetailFormModule { }
