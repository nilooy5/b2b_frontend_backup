import {Component, Inject, OnInit} from '@angular/core';
import {FleetInspectionService} from "../../../../../services/fleet-inspection.service";
import {InspectionForm} from "../../../../../types/fleet";
import {PopAlertService} from "../../../../../modules/pop-alert/pop-alert.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
    selector: 'app-form-template-select-search',
    templateUrl: './form-template-select-search.component.html',
    styleUrls: ['./form-template-select-search.component.scss']
})
export class FormTemplateSelectSearchComponent implements OnInit {
    loaded: boolean;
    forms: InspectionForm[];
    search: string;
    selectedItem: InspectionForm;

    constructor(
        private service: FleetInspectionService,
        private pop: PopAlertService,
        private dialogRef: MatDialogRef<FormTemplateSelectSearchComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { selectedItem: InspectionForm }
    ) {
    }

    ngOnInit() {
        if (this.data.selectedItem) {
            this.selectedItem = this.data.selectedItem;
        }
        this.service.getForms().toPromise().then(res => {
            this.loaded = true;
            this.forms = res;
        }).catch(_ => {
            this.loaded = true;
        });
    }

    onSelect() {

    }

    close() {
    }

    selectItem() {
        if (!this.selectedItem) {
            this.pop.open("Please select at least one form template");
        } else {
            this.dialogRef.close(this.selectedItem);
        }
    }
}
