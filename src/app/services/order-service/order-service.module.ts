import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrderService} from "./order.service";
import {OrderServiceConfig} from "../../types/orders";

@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ],
    providers: [OrderService]
})
export class OrderServiceModule {
    constructor(@Optional() @SkipSelf() parentModule: OrderService) {
        if (parentModule) {
            throw  Error("Order Service is already imported");
        }
    }

    public static forRoot(config?: OrderServiceConfig): ModuleWithProviders {
        return {
            ngModule: OrderServiceModule,
            providers: [{provide: OrderServiceConfig, useExisting: config}]
        }
    }
}
