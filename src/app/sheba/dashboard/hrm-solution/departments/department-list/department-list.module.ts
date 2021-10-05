import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentListRoutingModule } from './department-list-routing.module';
import {DepartmentListComponent} from './department-list.component';
import {DepartmentListFilterModule} from './department-list-filter/department-list-filter.module';
import {MatDialogModule, MatTableModule, MatTooltipModule} from '@angular/material';
import {DepartmentAddModalModule} from './department-add-modal/department-add-modal.module';
import {FormsModule} from '@angular/forms';
import {DepartmentAddRoleModalModule} from './department-add-role-modal/department-add-role-modal.module';

@NgModule({
    declarations: [
        DepartmentListComponent
    ],
    imports: [
        CommonModule,
        DepartmentListRoutingModule,
        DepartmentListFilterModule,
        MatDialogModule,
        DepartmentAddModalModule,
        DepartmentAddRoleModalModule,
        MatTableModule,
        FormsModule,
        MatTooltipModule
    ]
})
export class DepartmentListModule { }
