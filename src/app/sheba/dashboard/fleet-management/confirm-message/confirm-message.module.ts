import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ConfirmMessageComponent} from './confirm-message.component';

@NgModule({
    declarations: [
        ConfirmMessageComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ConfirmMessageComponent
    ]
})
export class ConfirmMessageModule { }
