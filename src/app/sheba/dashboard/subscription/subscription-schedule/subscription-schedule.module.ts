import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SubscriptionScheduleRoutingModule} from './subscription-schedule-routing.module';
import {SubscriptionScheduleComponent} from './subscription-schedule.component';
import {MultidatePickerModule} from '../../../../modules/multidate-picker/multidate-picker.module';
import {HeadersModule} from '../../../headers/headers.module';

@NgModule({
    declarations: [
        SubscriptionScheduleComponent
    ],
    imports: [
        CommonModule,
        SubscriptionScheduleRoutingModule,
        MultidatePickerModule,
        HeadersModule
    ],
    exports: [
        SubscriptionScheduleComponent
    ]
})
export class SubscriptionScheduleModule {
}
