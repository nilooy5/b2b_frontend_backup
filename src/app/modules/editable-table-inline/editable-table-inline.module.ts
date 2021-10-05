import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditableTableInlineComponent } from './editable-table-inline.component';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatTableModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        EditableTableInlineComponent
    ],
    imports: [
        CommonModule,
        MatTableModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatInputModule,
    ],
    exports: [
        EditableTableInlineComponent
    ]
})
export class EditableTableInlineModule { }
