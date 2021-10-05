import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfficeSettingsComponent } from './office-settings.component';
import { OfficeSettingsRouting } from './office-settings.routing';
import { OfficeSettingsDayTimeComponent } from './office-settings-day-time/office-settings-day-time.component';
import { OfficeSettingsAttendanceComponent } from './office-settings-attendance/office-settings-attendance.component';
import { OfficeSettingsHolidayComponent } from './office-settings-holiday/office-settings-holiday.component';
import { OfficeSettingsAttendanceEditComponent } from './office-settings-attendance/office-settings-attendance-edit/office-settings-attendance-edit.component';
import { OfficeSettingsDayTimeEditComponent } from './office-settings-day-time/office-settings-day-time-edit/office-settings-day-time-edit.component';
import {MatButtonModule, MatCheckboxModule, MatInputModule, MatFormFieldModule, MatRadioModule, MatTableModule} from '@angular/material';
import {NgbAlertModule, NgbPopoverModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ConfirmModalModule} from '../../../modals/confirm-modal/confirm-modal.module';
import {MaterialDateRangePickerModule} from '../../../../modules/material-date-range-picker/material-date-range-picker.module';
import {DateRangePickerModule} from '../../../../modules/date-range-picker/date-range-picker.module';
import { FirstpipePipe } from './types/firstpipe.pipe';
import {ConfirmDeleteModalModule} from '../../../modals/confirm-delete-modal/confirm-delete-modal.module';
import { OfficeSettingsHolidayBreadcrumbComponent } from './office-settings-holiday/office-settings-holiday-breadcrumb/office-settings-holiday-breadcrumb.component';

@NgModule({
    declarations: [
        OfficeSettingsComponent,
        OfficeSettingsDayTimeComponent,
        OfficeSettingsAttendanceComponent,
        OfficeSettingsHolidayComponent,
        OfficeSettingsAttendanceEditComponent,
        OfficeSettingsDayTimeEditComponent,
        FirstpipePipe,
        OfficeSettingsHolidayBreadcrumbComponent
    ],
    imports: [
        CommonModule,
        OfficeSettingsRouting,
        MatButtonModule,
        NgbPopoverModule,
        NgbTooltipModule,
        MatCheckboxModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        MatInputModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatRadioModule,
        NgbAlertModule,
        MatTableModule,
        ConfirmModalModule,
        MaterialDateRangePickerModule,
        DateRangePickerModule,
        ConfirmDeleteModalModule
    ]
})
export class OfficeSettingsModule { }
