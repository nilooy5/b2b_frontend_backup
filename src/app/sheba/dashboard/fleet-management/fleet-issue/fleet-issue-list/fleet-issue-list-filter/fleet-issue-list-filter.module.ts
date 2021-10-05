import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FleetIssueListFilterComponent} from './fleet-issue-list-filter.component';

@NgModule({
    declarations: [FleetIssueListFilterComponent],
    imports: [
        CommonModule
    ],
    exports: [FleetIssueListFilterComponent]
})
export class FleetIssueListFilterModule { }
