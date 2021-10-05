import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ShebaBillComponent} from './sheba-bill.component';

@NgModule({
    declarations: [
        ShebaBillComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ShebaBillComponent
    ]
})
export class ShebaBillModule { }
