import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ServiceCartComponent} from './service-cart.component';
import {ServiceCartItemComponent} from './service-cart-item/service-cart-item.component';
import {ServiceCartItemModule} from './service-cart-item/service-cart-item.module';

@NgModule({
    declarations: [ServiceCartComponent],
    imports: [
        CommonModule,
        ServiceCartItemModule
    ],
    exports: [ServiceCartComponent]
})
export class ServiceCartModule {
}
