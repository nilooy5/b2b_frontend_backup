import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyAccountRoutingModule } from './my-account-routing.module';
import { MyAccountComponent } from './my-account.component';
import {LazyLoadImageModule} from "ng-lazyload-image";

@NgModule({
  declarations: [MyAccountComponent],
    imports: [
        CommonModule,
        MyAccountRoutingModule,
        LazyLoadImageModule,
        LazyLoadImageModule
    ]
})
export class MyAccountModule { }
