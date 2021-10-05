import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';
import { RfqOrdersComponent } from './rfq-orders.component';
import { RfqOrdersListModule } from './rfq-orders-list/rfq-orders-list.module';
import { RfqOrdersRoutingModule } from './rfq-orders-routing.module';
import { RfqOrdersDetailsGeneralModule } from './rfq-orders-details-general/rfq-orders-details-general.module';
import {RfqFooterHelpModule} from '../rfq-footer-help/rfq-footer-help.module';

@NgModule({
    declarations: [
        RfqOrdersComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        RfqOrdersRoutingModule,
        RfqOrdersListModule,
        RfqOrdersDetailsGeneralModule,
        RfqFooterHelpModule
    ]
})

export class RfqOrdersModule { }
