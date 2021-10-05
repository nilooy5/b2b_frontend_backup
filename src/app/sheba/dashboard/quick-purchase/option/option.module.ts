import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OptionComponent} from './option.component';
import {OptionRoutingModule} from './option-routing.module';
import {HeadersModule} from '../../../headers/headers.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule, MatFormFieldModule, MatRadioModule, MatSelectModule} from '@angular/material';

@NgModule({
    declarations: [
        OptionComponent
    ],
    imports: [
        CommonModule,
        OptionRoutingModule,
        HeadersModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatRadioModule,
        MatCheckboxModule,
        FormsModule
    ]
})
export class OptionModule { }
