import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileViewModalComponent } from './mobile-view-modal.component';
import { ModalModule } from 'ngx-bootstrap';

@NgModule({
    declarations: [ MobileViewModalComponent ],
    imports: [ CommonModule, ModalModule.forRoot() ],
    exports: [ MobileViewModalComponent]
})

export class MobileViewModalModule { }
