import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactUsRoutingModule } from './contact-us-routing.module';
import { ContactUsComponent } from './contact-us.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material';

@NgModule({
    declarations: [
        ContactUsComponent
    ],
    exports: [
        ContactUsComponent
    ],
    imports: [
        CommonModule,
        ContactUsRoutingModule,
        ReactiveFormsModule,
        MatFormFieldModule
    ]
})

export class ContactUsModule { }
