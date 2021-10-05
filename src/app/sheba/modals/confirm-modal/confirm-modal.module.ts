import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from './confirm-modal.component';
import { MatDialogModule } from '@angular/material';

@NgModule({
    declarations: [ConfirmModalComponent],
    imports: [
        CommonModule,
        MatDialogModule
    ],
    exports: [ConfirmModalComponent],
    entryComponents: [ConfirmModalComponent]
})

export class ConfirmModalModule { }


