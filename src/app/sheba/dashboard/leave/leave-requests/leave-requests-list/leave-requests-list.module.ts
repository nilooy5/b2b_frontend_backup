import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCheckboxModule, MatFormFieldModule, MatOptionModule, MatSelectModule, MatTableModule} from '@angular/material';
import { BadgeModule } from '../../../../../modules/badge/badge.module';
import { LeaveRequestsListRoutingModule } from './leave-requests-list-routing.module';
import { LeaveRequestsListComponent } from './leave-requests-list.component';
import { LeaveRequestsListFilterComponent } from './leave-requests-list-filter/leave-requests-list-filter.component';
import {NgbAlertModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {NgSelectModule} from "@ng-select/ng-select";
import {LeaveRequestsListEmptyComponent} from './leave-requests-list-empty/leave-requests-list-empty.component';

@NgModule({
    declarations: [
        LeaveRequestsListComponent,
        LeaveRequestsListFilterComponent,
        LeaveRequestsListEmptyComponent
    ],
    imports: [
        CommonModule,
        LeaveRequestsListRoutingModule,
        MatTableModule,
        BadgeModule,
        MatFormFieldModule,
        MatOptionModule,
        MatSelectModule,
        MatCheckboxModule,
        NgbAlertModule,
        NgSelectModule,
        NgbTooltipModule
    ]
})

export class LeaveRequestsListModule { }
