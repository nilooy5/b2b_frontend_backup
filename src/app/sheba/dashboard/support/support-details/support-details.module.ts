import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SupportDetailsComponent} from './support-details.component';
import {SupportDetailsRoutingModule} from './support-details-routing.module';

@NgModule({
    declarations: [
        SupportDetailsComponent
    ],
    imports: [
        CommonModule,
        SupportDetailsRoutingModule
    ]
})
export class SupportDetailsModule { }
