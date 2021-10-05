import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TenderVerifyPhoneComponent} from './tender-verify-phone.component';
import {MatDialogModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {TenderOtpPinModule} from '../tender-otp-pin/tender-otp-pin.module';

@NgModule({
    declarations: [TenderVerifyPhoneComponent],
    imports: [
        CommonModule,
        MatDialogModule,
        FormsModule,
        TenderOtpPinModule
    ],
    exports: [TenderVerifyPhoneComponent],
    entryComponents: [TenderVerifyPhoneComponent]
})
export class TenderVerifyPhoneModule {
}
