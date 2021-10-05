import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ServiceDetailsModalComponent} from './service-details-modal.component';
import {MatDialogModule} from '@angular/material';

@NgModule({
    declarations: [
        ServiceDetailsModalComponent
    ],
    imports: [
        CommonModule,
        MatDialogModule
    ],
    exports: [ServiceDetailsModalComponent],
    entryComponents: [ServiceDetailsModalComponent]
})
export class ServiceDetailsModalModule { }
