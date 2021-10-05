import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfficeSettingsComponent } from './office-settings.component';
import { OfficeSettingsDayTimeComponent } from './office-settings-day-time/office-settings-day-time.component';
import { OfficeSettingsAttendanceComponent } from './office-settings-attendance/office-settings-attendance.component';
import { OfficeSettingsHolidayComponent } from './office-settings-holiday/office-settings-holiday.component';
import { OfficeSettingsAttendanceEditComponent } from './office-settings-attendance/office-settings-attendance-edit/office-settings-attendance-edit.component';
import { OfficeSettingsDayTimeEditComponent } from './office-settings-day-time/office-settings-day-time-edit/office-settings-day-time-edit.component';
import {OfficeSettingsDayTimeResolverService} from './services/office-settings-day-time-resolver.service';
import {OfficeSettingsAttendanceResolverService} from './services/office-settings-attendance-resolver.service';
import {HolidayListResolverService} from './services/holiday-list-resolver.service';

const routes: Routes = [
    {
        path: '',
        component: OfficeSettingsComponent,
        children: [
            {
                path: 'day-time',
                children: [
                    {
                        path: '',
                        component: OfficeSettingsDayTimeComponent,
                        resolve: {
                            officeSettingsTimeResolver: OfficeSettingsDayTimeResolverService
                        }
                    },
                    {
                        path: 'edit',
                        component: OfficeSettingsDayTimeEditComponent,
                        resolve: {
                            officeSettingsTimeResolver: OfficeSettingsDayTimeResolverService
                        }
                    }
                ]
            },
            {
                path: 'attendance',
                children: [
                    {
                        path: '',
                        component: OfficeSettingsAttendanceComponent,
                        resolve: {
                            officeAttendanceSettingResolver: OfficeSettingsAttendanceResolverService
                        }
                    },
                    {
                        path: 'edit',
                        component: OfficeSettingsAttendanceEditComponent,
                        resolve: {
                            officeAttendanceSettingResolver: OfficeSettingsAttendanceResolverService
                        }
                    }
                ]
            },
            {
                path: 'holiday',
                component: OfficeSettingsHolidayComponent,
                resolve: {
                    holidayList: HolidayListResolverService
                }
            },
            {
                path: '**',
                redirectTo: 'day-time'
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class OfficeSettingsRouting { }
