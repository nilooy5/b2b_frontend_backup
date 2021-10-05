import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material";
import {PopAlertService} from "../../../../../../../modules/pop-alert/pop-alert.service";

@Component({
    selector: 'app-acknowledge-note-modal',
    templateUrl: './acknowledge-note-modal.component.html',
    styleUrls: ['./acknowledge-note-modal.component.scss']
})
export class AcknowledgeNoteModalComponent implements OnInit {
    note: string;

    constructor(
        private dialogRef: MatDialogRef<AcknowledgeNoteModalComponent>,
        private pop:PopAlertService
    ) {
    }

    ngOnInit() {
    }
    submit(){
        if(!this.note){
            this.pop.open('A note is required')
        }else{
            this.dialogRef.close(this.note);
        }

    }

}
