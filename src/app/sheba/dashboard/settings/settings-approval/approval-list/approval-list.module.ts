import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApprovalListComponent } from './approval-list.component';
import { ApprovalListRoutingModule } from './approval-list-routing.module';
import { MatTableModule } from '@angular/material';
import { ApprovalListFilterComponent } from './approval-list-filter/approval-list-filter.component';

@NgModule({
    declarations: [
        ApprovalListComponent,
        ApprovalListFilterComponent
    ],
    imports: [
        CommonModule,
        ApprovalListRoutingModule,
        MatTableModule
    ]
})

export class ApprovalListModule { }
