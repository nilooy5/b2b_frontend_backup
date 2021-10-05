import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TenderOtpPinComponent} from './tender-otp-pin.component';
import {MatDialogModule} from '@angular/material';

@NgModule({
    declarations: [TenderOtpPinComponent],
    imports: [
        CommonModule,
        MatDialogModule
    ],
    exports: [TenderOtpPinComponent],
    entryComponents: [TenderOtpPinComponent]
})
export class TenderOtpPinModule {
}
