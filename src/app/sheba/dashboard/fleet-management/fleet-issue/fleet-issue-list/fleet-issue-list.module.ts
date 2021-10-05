import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FleetIssueListRoutingModule } from './fleet-issue-list-routing.module';
import {FleetIssueListComponent} from './fleet-issue-list.component';
import {FleetIssueListFilterModule} from './fleet-issue-list-filter/fleet-issue-list-filter.module';
import {MatTableModule} from '@angular/material';
import {FormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        FleetIssueListComponent
    ],
    imports: [
        CommonModule,
        FleetIssueListRoutingModule,
        FleetIssueListFilterModule,
        MatTableModule,
        FormsModule,
    ]
})
export class FleetIssueListModule { }
