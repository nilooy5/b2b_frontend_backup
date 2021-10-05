import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FleetIssueDetailsRoutingModule } from './fleet-issue-details-routing.module';
import {FleetIssueDetailsComponent} from './fleet-issue-details.component';
import {ShebaWidgetsModule} from '../../../../../modules/sheba-widgets/sheba-widgets.module';
import {FleetIssueCloseModalModule} from './fleet-issue-close-modal/fleet-issue-close-modal.module';
import {CommentsModule} from '../../../../../modules/comments/comments.module';

@NgModule({
    declarations: [
        FleetIssueDetailsComponent
    ],
    imports: [
        CommonModule,
        FleetIssueDetailsRoutingModule,
        ShebaWidgetsModule,
        FleetIssueCloseModalModule,
        CommentsModule
    ]
})
export class FleetIssueDetailsModule { }
