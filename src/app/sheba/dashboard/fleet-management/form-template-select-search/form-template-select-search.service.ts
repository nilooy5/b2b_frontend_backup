import {Injectable} from '@angular/core';
import {MatDialog} from "@angular/material";
import {FormTemplateSelectSearchComponent} from "./form-template-select-search/form-template-select-search.component";

@Injectable({
    providedIn: 'root'
})
export class FormTemplateSelectSearchService {

    constructor(
        public dialog: MatDialog
    ) {
    }

    open(data?: any) {
        return this.dialog.open(FormTemplateSelectSearchComponent, {
            maxWidth: '80vw',
            maxHeight: '90vh',
            data: data,
        });
    }
}
