import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionOrderTabComponent } from './subscription-order-tab.component';
import {MatTableModule} from '@angular/material';
import {ShebaWidgetsModule} from '../../../../../modules/sheba-widgets/sheba-widgets.module';
import {RouterModule} from '@angular/router';

@NgModule({
    declarations: [
        SubscriptionOrderTabComponent
    ],
    exports: [
        SubscriptionOrderTabComponent
    ],
    imports: [
        CommonModule,
        MatTableModule,
        ShebaWidgetsModule,
        RouterModule
    ]
})
export class SubscriptionOrderTabModule { }
