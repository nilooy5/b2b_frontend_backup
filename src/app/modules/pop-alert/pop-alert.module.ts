import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PopAlertService} from "./pop-alert.service";
import {MatSnackBarModule} from "@angular/material";
import {PopAlertConfig} from "./config";
import {PopAlertSuccessComponent} from './pop-alert-success/pop-alert-success.component';
import {PopAlertErrorComponent} from './pop-alert-error/pop-alert-error.component';

@NgModule({
    declarations: [PopAlertSuccessComponent, PopAlertErrorComponent],
    imports: [
        CommonModule,
        MatSnackBarModule
    ],
    providers: [PopAlertService]
})
export class PopAlertModule {
    constructor(@Optional() @SkipSelf() parentModule: PopAlertModule) {
        if (parentModule) {
            throw Error('Pop alert module is already defined');
        }
    }

    static forRoot(config?: PopAlertConfig): ModuleWithProviders {
        return {
            ngModule: PopAlertModule,
            providers: [{provide: PopAlertConfig, useExisting: config}]
        }
    }
}
