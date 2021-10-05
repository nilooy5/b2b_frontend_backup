import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EditRowModalComponent} from './edit-row-modal.component';
import {MatDialogModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        EditRowModalComponent
    ],
    imports: [
        CommonModule,
        MatDialogModule,
        FormsModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule
    ],
    exports: [
        EditRowModalComponent
    ],
    entryComponents: [
        EditRowModalComponent
    ]
})
export class EditRowModalModule { }
