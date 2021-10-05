import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartnerListRoutingModule } from './partner-list-routing.module';
import {PartnerListComponent} from './partner-list.component';
import {HeadersModule} from '../../../headers/headers.module';
import {PartnerListItemModule} from './partner-list-item/partner-list-item.module';

@NgModule({
    declarations: [PartnerListComponent],
    imports: [
        CommonModule,
        PartnerListRoutingModule,
        HeadersModule,
        PartnerListItemModule
    ]
})
export class PartnerListModule { }
