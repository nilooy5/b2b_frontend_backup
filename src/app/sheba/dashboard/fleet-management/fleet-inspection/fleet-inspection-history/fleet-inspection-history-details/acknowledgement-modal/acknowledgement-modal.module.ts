import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AcknowledgementModalComponent} from './acknowledgement-modal.component';
import {MatDialogModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        AcknowledgementModalComponent
    ],
    imports: [
        CommonModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [
        AcknowledgementModalComponent
    ],
    entryComponents: [
        AcknowledgementModalComponent
    ]
})
export class AcknowledgementModalModule { }
