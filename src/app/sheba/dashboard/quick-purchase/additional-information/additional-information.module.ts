import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdditionalInformationComponent } from './additional-information.component';
import { AdditionalInformationRoutingModule } from './additional-information-routing.module';
import { HeadersModule } from '../../../headers/headers.module';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        AdditionalInformationComponent
    ],
    imports: [
        CommonModule,
        AdditionalInformationRoutingModule,
        HeadersModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule
    ]
})

export class AdditionalInformationModule { }
