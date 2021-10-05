import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageModalComponent } from './image-modal.component';
import {ModalModule} from 'ngx-bootstrap';

@NgModule({
    declarations: [ImageModalComponent],
    exports: [
        ImageModalComponent
    ],
    imports: [
        CommonModule,
        ModalModule.forRoot()
    ]
})
export class ImageModalModule { }
