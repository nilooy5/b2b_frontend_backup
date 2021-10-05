import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OrderListsRoutingModule} from './order-lists-routing.module';
import {OrderListsComponent} from './order-lists.component';
import {FormsModule} from "@angular/forms";
import {MatTableModule} from "@angular/material";
import {LazyLoadImageModule} from "ng-lazyload-image";
import {ShebaWidgetsModule} from "../../../../modules/sheba-widgets/sheba-widgets.module";

@NgModule({
    declarations: [OrderListsComponent],
    imports: [
        CommonModule,
        FormsModule,
        OrderListsRoutingModule,
        MatTableModule,
        LazyLoadImageModule.forRoot({}),
        ShebaWidgetsModule
    ]
})
export class OrderListsModule {
}
