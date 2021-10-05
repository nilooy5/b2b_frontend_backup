import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RfqComponent } from './rfq.component';
import { RfqRoutingModule } from './rfq-routing.module';
import {RfqListModule} from './rfq-list/rfq-list.module';

@NgModule({
    declarations: [
        RfqComponent
    ],
    imports: [
        CommonModule,
        RfqListModule,
        RfqRoutingModule
    ]
})

export class RfqModule { }
