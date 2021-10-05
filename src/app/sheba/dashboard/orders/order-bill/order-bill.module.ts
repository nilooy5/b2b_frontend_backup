import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrderBillComponent} from './order-bill.component';

@NgModule({
    declarations: [
        OrderBillComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        OrderBillComponent
    ]
})
export class OrderBillModule {
}
