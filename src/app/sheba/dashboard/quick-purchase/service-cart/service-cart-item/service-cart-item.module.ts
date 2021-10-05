import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ServiceCartItemComponent} from './service-cart-item.component';
import {ServiceCartComponent} from '../service-cart.component';
import {FormsModule} from '@angular/forms';

@NgModule({
    declarations: [ServiceCartItemComponent],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [ServiceCartItemComponent]
})
export class ServiceCartItemModule { }
