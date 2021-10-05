import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InspectionScheduleSubmitRoutingModule } from './inspection-schedule-submit-routing.module';
import {InspectionScheduleSubmitComponent} from './inspection-schedule-submit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormDirectivesModule} from '../../../../../../directives/form-directives/form-directives.module';
import {MatRadioModule} from '@angular/material';

@NgModule({
    declarations: [
        InspectionScheduleSubmitComponent
    ],
    imports: [
        CommonModule,
        InspectionScheduleSubmitRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        FormDirectivesModule,
        MatRadioModule,
    ]
})
export class InspectionScheduleSubmitModule { }
