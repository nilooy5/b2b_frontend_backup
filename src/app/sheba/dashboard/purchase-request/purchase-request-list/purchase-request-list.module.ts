import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseRequestListComponent } from './purchase-request-list.component';
import { PurchaseRequestListRoutingModule} from './purchase-request-list-routing.module';
import {MatTableModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {LazyLoadImageModule} from 'ng-lazyload-image';
import {ShebaWidgetsModule} from '../../../../modules/sheba-widgets/sheba-widgets.module';
import {PurchaseRequestListFilterModule} from "./purchase-request-list-filter/purchase-request-list-filter.module";

@NgModule({
    declarations: [PurchaseRequestListComponent],
    imports: [
        CommonModule,
        PurchaseRequestListRoutingModule,
        MatTableModule,
        FormsModule,
        LazyLoadImageModule.forRoot({}),
        ShebaWidgetsModule,
        PurchaseRequestListFilterModule
    ]
})
export class PurchaseRequestListModule { }
