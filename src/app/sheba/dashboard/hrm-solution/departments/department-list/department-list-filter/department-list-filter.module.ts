import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DepartmentListFilterComponent} from './department-list-filter.component';

@NgModule({
    declarations: [
        DepartmentListFilterComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        DepartmentListFilterComponent
    ]
})
export class DepartmentListFilterModule { }
