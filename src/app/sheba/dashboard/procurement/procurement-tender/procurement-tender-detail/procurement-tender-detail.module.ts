import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProcurementTenderDetailComponent} from './procurement-tender-detail.component';
import {ProcurementTenderDetailRoutingModule} from './procurement-tender-detail-routing.module';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule, MatDividerModule,
    MatFormFieldModule, MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatNativeDateModule,
    MatRadioModule,
    MatTableModule
} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {FormDirectivesModule} from '../../../../../directives/form-directives/form-directives.module';

@NgModule({
    declarations: [
        ProcurementTenderDetailComponent
    ],
    imports: [
        CommonModule,
        ProcurementTenderDetailRoutingModule,
        MatTableModule,
        MatRadioModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        FormDirectivesModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatInputModule,
        MatMenuModule,
        MatDividerModule,
        MatIconModule,
        MatButtonModule
    ]
})
export class ProcurementTenderDetailModule { }
