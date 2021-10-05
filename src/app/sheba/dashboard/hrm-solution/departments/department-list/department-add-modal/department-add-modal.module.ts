import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule, MatTooltipModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormDirectivesModule} from '../../../../../../directives/form-directives/form-directives.module';
import {DepartmentAddModalComponent} from './department-add-modal.component';

@NgModule({
    declarations: [
        DepartmentAddModalComponent
    ],
    imports: [
        CommonModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
        FormDirectivesModule
    ],
    entryComponents: [
        DepartmentAddModalComponent
    ],
    exports: [
        DepartmentAddModalComponent
    ]
})
export class DepartmentAddModalModule { }
