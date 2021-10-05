import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DriverImageEditRoutingModule } from './driver-image-edit-routing.module';
import {DriverImageEditComponent} from './driver-image-edit.component';
import {ShebaWidgetsModule} from '../../../../../../modules/sheba-widgets/sheba-widgets.module';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        DriverImageEditComponent
    ],
    imports: [
        CommonModule,
        DriverImageEditRoutingModule,
        ShebaWidgetsModule,
        ReactiveFormsModule,
    ]
})
export class DriverImageEditModule { }
