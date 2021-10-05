import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FleetInspectionFailedItemDetailsComponent} from './fleet-inspection-failed-item-details.component';
import {MatDialogModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule} from "@angular/material";
import {RouterModule} from "@angular/router";
import { AcknowledgeNoteModalComponent } from './acknowledge-note-modal/acknowledge-note-modal.component';
import {FormsModule} from "@angular/forms";

@NgModule({
    declarations: [FleetInspectionFailedItemDetailsComponent, AcknowledgeNoteModalComponent],
    imports: [
        CommonModule,
        MatDialogModule,
        RouterModule,
        MatProgressSpinnerModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule
    ],
    exports: [FleetInspectionFailedItemDetailsComponent],
    entryComponents: [FleetInspectionFailedItemDetailsComponent, AcknowledgeNoteModalComponent]
})
export class FleetInspectionFailedItemDetailsModule {
}
