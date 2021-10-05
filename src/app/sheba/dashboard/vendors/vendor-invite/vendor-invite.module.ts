import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {VendorInviteRoutingModule} from './vendor-invite-routing.module';
import {VendorInviteComponent} from './vendor-invite.component';
import {HeadersModule} from "../../../headers/headers.module";
import {
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule
} from "@angular/material";
import {LazyLoadImageModule} from "ng-lazyload-image";

@NgModule({
    declarations: [VendorInviteComponent],
    imports: [
        CommonModule,
        HeadersModule,
        MatChipsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        VendorInviteRoutingModule,
        LazyLoadImageModule.forRoot({}),
        MatProgressBarModule
    ]
})
export class VendorInviteModule {
}
