import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EditableTableComponent} from './editable-table.component';
import {MatDialogModule, MatMenuModule, MatTableModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {EditRowModalModule} from './edit-row-modal/edit-row-modal.module';

@NgModule({
    declarations: [
        EditableTableComponent
    ],
    imports: [
        CommonModule,
        MatTableModule,
        FormsModule,
        EditRowModalModule,
        MatMenuModule
    ],
    exports: [
        EditableTableComponent
    ]
})
export class EditableTableModule { }
