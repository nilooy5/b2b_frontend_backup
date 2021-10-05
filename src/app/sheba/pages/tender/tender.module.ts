import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TenderComponent } from './tender.component';
import { TenderRoutingModule } from './tender-routing.module';
// import { TenderHomeComponent } from './tender-home/tender-home.component';
// import { TenderListModule } from './tender-list/tender-list.module';
import { TenderLandingComponent } from './tender-landing/tender-landing.component';
import {TenderVerifyPhoneModule} from '../../modals/tender-verify-phone/tender-verify-phone.module';
import { TenderLandingModule } from './tender-landing/tender-landing.module';

@NgModule({
    declarations: [
        TenderComponent,
        // TenderHomeComponent,
        TenderLandingComponent
    ],
    imports: [
        CommonModule,
        TenderRoutingModule,
        TenderVerifyPhoneModule,
        TenderLandingModule
        // TenderListModule
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
})

export class TenderModule { }
