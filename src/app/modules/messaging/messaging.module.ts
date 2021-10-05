import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagingComponent } from './messaging.component';
import {MatInputModule, MatProgressSpinnerModule} from '@angular/material';
import {LazyLoadImageModule} from 'ng-lazyload-image';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        MessagingComponent
    ],
    imports: [
        CommonModule,
        MatInputModule,
        LazyLoadImageModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule
    ],
    exports: [
        MessagingComponent
    ]
})
export class MessagingModule { }
