import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormDirectivesModule} from '../../../../../../directives/form-directives/form-directives.module';
import {DepartmentAddRoleModalComponent} from './department-add-role-modal.component';

@NgModule({
    declarations: [
        DepartmentAddRoleModalComponent
    ],
    imports: [
        CommonModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
        FormDirectivesModule
    ],
    entryComponents: [
        DepartmentAddRoleModalComponent
    ],
    exports: [
        DepartmentAddRoleModalComponent
    ]
})
export class DepartmentAddRoleModalModule { }
