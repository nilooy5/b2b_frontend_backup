import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {FleetInspectionFailedItem} from "../../../../../../types/fleet";
import {FleetInspectionService} from "../../../../../../services/fleet-inspection.service";
import {PopAlertService} from "../../../../../../modules/pop-alert/pop-alert.service";
import {getErrorMessage} from "../../../../../../helpers/functions";
import {AcknowledgeNoteModalComponent} from "./acknowledge-note-modal/acknowledge-note-modal.component";

export interface FleetInspectionFormDetailsData {
    item: FleetInspectionFailedItem
}

@Component({
    selector: 'app-fleet-inspection-failed-item-details',
    templateUrl: './fleet-inspection-failed-item-details.component.html',
    styleUrls: ['./fleet-inspection-failed-item-details.component.scss']
})
export class FleetInspectionFailedItemDetailsComponent implements OnInit {
    submitting: boolean;

    constructor(
        private dialogRef: MatDialogRef<FleetInspectionFailedItemDetailsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: FleetInspectionFormDetailsData,
        private service: FleetInspectionService,
        private dialog: MatDialog,
        private pop: PopAlertService
    ) {
    }

    ngOnInit() {
    }

    acknowledge() {
        const ref = this.dialog.open(AcknowledgeNoteModalComponent, {
            minWidth: '400px',
        });
        ref.afterClosed().subscribe(res => {
            if (res && res !== '') {
                this.submitting = true;
                this.service.createAcknowledge(this.data.item.inspection_id, this.data.item.id, {note: res}).toPromise().then(res => {
                    this.submitting = false;
                    this.pop.open(res.message);
                    if (res.code === 200) {
                        this.dialogRef.close('Acknowledge');
                    }
                }).catch(err => {
                    this.submitting = false;
                    this.pop.open(getErrorMessage(err));
                });
            }
        });
    }

    issue() {
        this.submitting = true;
        this.service.createIssue({inspection_item_id: this.data.item.id}).toPromise().then(res => {
            this.submitting = false;
            this.pop.open(res.message);
            if (res.code === 200) {
                this.dialogRef.close('issue');
            }
        })
    }

}
