import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GeneralRootRoutingModule} from './general-root-routing.module';
import {GeneralRootComponent} from './general-root.component';
import {HeadersModule} from "../headers/headers.module";
import {FootersModule} from "../footers/footers.module";

@NgModule({
    declarations: [GeneralRootComponent],
    imports: [
        CommonModule,
        GeneralRootRoutingModule,
        HeadersModule,
        FootersModule
    ]
})
export class GeneralRootModule {
}
