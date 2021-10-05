import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatDialogModule} from '@angular/material';
import {ConfirmDeleteModalComponent} from './confirm-delete-modal.component';

@NgModule({
    declarations: [ConfirmDeleteModalComponent],
    imports: [
        CommonModule,
        MatDialogModule
    ],
    exports: [ConfirmDeleteModalComponent],
    entryComponents: [ConfirmDeleteModalComponent]
})
export class ConfirmDeleteModalModule {
}
