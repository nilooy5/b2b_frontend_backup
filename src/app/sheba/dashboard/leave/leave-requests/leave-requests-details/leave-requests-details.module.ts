import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaveRequestsDetailsRoutingModule } from './leave-requests-details-routing.module';
import {LeaveRequestsDetailsComponent} from './leave-requests-details.component';
import {MatButtonModule} from "@angular/material/button";
import {NgxGalleryModule} from 'ngx-gallery';
import { LeaveRequestsDetailsInfoComponent } from './leave-requests-details-info/leave-requests-details-info.component';
import { LeaveRequestsDetailsApproversComponent } from './leave-requests-details-approvers/leave-requests-details-approvers.component';

@NgModule({
  declarations: [
      LeaveRequestsDetailsComponent,
      LeaveRequestsDetailsInfoComponent,
      LeaveRequestsDetailsApproversComponent
  ],
    imports: [
        CommonModule,
        LeaveRequestsDetailsRoutingModule,
        MatButtonModule,
        NgxGalleryModule
    ]
})
export class LeaveRequestsDetailsModule { }
