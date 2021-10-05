import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ShebaHttpInjectorService} from "./sheba-http-injector.service";
import {ShebaHttpService} from "./sheba-http.service";
import {ShebaHttpConfig} from "./http.conf";

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ShebaHttpInjectorService,
            multi: true
        },
        ShebaHttpService
    ]
})
export class ShebaHttpModule {
    constructor(@Optional() @SkipSelf() parentModule: ShebaHttpModule) {
        if (parentModule) {
            throw new Error('Sheba HttpModule is already declared , you only have to declare it once');
        }
    }

    public static forRoot(config?: ShebaHttpConfig): ModuleWithProviders {
        return {
            ngModule: ShebaHttpModule,
            providers: [
                {
                    provide: ShebaHttpConfig,
                    useValue: config
                }
            ]
        }
    }
}
