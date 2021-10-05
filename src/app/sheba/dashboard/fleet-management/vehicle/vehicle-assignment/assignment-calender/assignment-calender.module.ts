import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AssignmentCalenderComponent} from './assignment-calender.component';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';

import {CalendarModule, DateAdapter} from 'angular-calendar';
import {FormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        AssignmentCalenderComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory
        })
    ],
    exports: [
        AssignmentCalenderComponent
    ],
})
export class AssignmentCalenderModule { }
