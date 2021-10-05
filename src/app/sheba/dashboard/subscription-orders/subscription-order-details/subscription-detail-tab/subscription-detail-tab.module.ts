import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SubscriptionDetailTabComponent} from './subscription-detail-tab.component';
import {CommentsModule} from '../../../../../modules/comments/comments.module';
import {ShebaWidgetsModule} from '../../../../../modules/sheba-widgets/sheba-widgets.module';

@NgModule({
    declarations: [
        SubscriptionDetailTabComponent
    ],
    exports: [
        SubscriptionDetailTabComponent
    ],
    imports: [
        CommonModule,
        CommentsModule,
        ShebaWidgetsModule
    ]
})
export class SubscriptionDetailTabModule { }
