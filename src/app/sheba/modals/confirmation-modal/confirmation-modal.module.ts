import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfirmationModalComponent} from './confirmation-modal.component';
import {MatDialogModule} from '@angular/material';

@NgModule({
    declarations: [
        ConfirmationModalComponent
    ],
    imports: [
        CommonModule,
        MatDialogModule
    ],
    exports: [ConfirmationModalComponent],
    entryComponents: [ConfirmationModalComponent]
})
export class ConfirmationModalModule {
}
