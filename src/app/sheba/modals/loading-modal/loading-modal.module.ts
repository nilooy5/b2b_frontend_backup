import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingModalComponent } from './loading-modal.component';
import { MatDialogModule, MatProgressBarModule } from '@angular/material';

@NgModule({
    declarations: [
        LoadingModalComponent
    ],
    imports: [
        CommonModule,
        MatDialogModule,
        MatProgressBarModule
    ],
    exports: [LoadingModalComponent],
    entryComponents: [LoadingModalComponent]
})

export class LoadingModalModule { }
