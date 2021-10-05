import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import { CommonModule } from '@angular/common';
import {TenderService} from './tender.service';
import {TenderServiceConfig} from '../../types/orders';

@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ],
    providers: [
        TenderService
    ]
})
export class TenderServiceModule {
    constructor(@Optional() @SkipSelf() parentModule: TenderService) {
        if (parentModule) {
            throw  Error('Order Service is already imported');
        }
    }

    public static forRoot(config?: TenderServiceConfig): ModuleWithProviders {
        return {
            ngModule: TenderServiceModule,
            providers: [{provide: TenderServiceConfig, useExisting: config}]
        };
    }
}
