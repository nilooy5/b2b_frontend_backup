import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FleetRequestDetailsRoutingModule} from './fleet-request-details-routing.module';
import {FleetRequestDetailsComponent} from './fleet-request-details.component';
import {CommentsModule} from '../../../../../modules/comments/comments.module';
import {LazyLoadImageModule} from 'ng-lazyload-image';
import {ShebaPipesModule} from '../../../../../pipes/sheba-pipes/sheba-pipes.module';
import {ApproverCardModule} from '../../../../../components/cards/approver-card/approver-card.module';

@NgModule({
    declarations: [FleetRequestDetailsComponent],
    imports: [
        CommonModule,
        FleetRequestDetailsRoutingModule,
        CommentsModule,
        LazyLoadImageModule.forRoot({}),
        ShebaPipesModule,
        ApproverCardModule
    ]
})
export class FleetRequestDetailsModule {
}
