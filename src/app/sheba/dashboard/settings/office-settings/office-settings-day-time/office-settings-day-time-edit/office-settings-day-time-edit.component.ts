import {Component, OnDestroy, OnInit} from '@angular/core';
import {Breadcrumb} from '../../../../../../types/general';
import {DashboardSharedService} from '../../../../../../services/dashboard-shared.service';
import {FormEssentials} from '../../../../../../helpers/classes';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import * as moment from 'moment';
import {formatDateTime, formatInitialTimeForTimePicker, formatOnlyTime, getErrorMessage} from '../../../../../../helpers/functions';
import {MatCheckboxChange, MatDialog} from '@angular/material';
import {PopAlertService} from '../../../../../../modules/pop-alert/pop-alert.service';
import {OfficeSettingsService} from '../../services/office-settings.service';
import {ConfirmModalComponent} from '../../../../../modals/confirm-modal/confirm-modal.component';

@Component({
    selector: 'app-office-settings-day-time-edit',
    templateUrl: './office-settings-day-time-edit.component.html',
    styleUrls: ['./office-settings-day-time-edit.component.scss']
})

export class OfficeSettingsDayTimeEditComponent extends FormEssentials implements OnInit, OnDestroy {

    office_timing: any;
    weekends: any;
    existing_weekends: any;
    new_weekends: any = [];
    setStartTime: any;
    setEndTime: any;
    error_message: any;
    breadcrumb: Breadcrumb[] = [
        {
            title: 'Settings',
            path: '/dashboard/settings'
        },
        {
            title: 'Office Settings',
            path: '/dashboard/settings/office/day-time'
        },
        {
            title: 'Edit',
            isActive: true
        }
    ];

    constructor(private dashboardSharedService: DashboardSharedService,
                private fb: FormBuilder,
                private route: ActivatedRoute,
                private pop: PopAlertService,
                private service: OfficeSettingsService,
                private dialog: MatDialog,
                private router: Router) {
        super();
        this.dashboardSharedService.changeBreadcrumb(true, this.breadcrumb);
        this.route.data.subscribe(({officeSettingsTimeResolver}) => {
            const office_timing_info = officeSettingsTimeResolver[0];
            this.office_timing = office_timing_info.office_timing;
            this.existing_weekends = this.office_timing.weekends;
            this.new_weekends = this.office_timing.weekends;
            this.setTimeInTimePicker();
        });
        this.form = this.fb.group({
            start_date: new FormControl(new Date(new Date().setHours(this.setStartTime[0], this.setStartTime[1], 0, 0))),
            end_date: new FormControl(new Date(new Date().setHours(this.setEndTime[0], this.setEndTime[1], 0, 0))),
        });
        this.weekends = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    }

    ngOnInit() {
    }

    setTimeInTimePicker() {
        this.setStartTime = formatInitialTimeForTimePicker(this.office_timing.start_time);
        this.setEndTime = formatInitialTimeForTimePicker(this.office_timing.end_time);
    }

    submit(event) {
        event.preventDefault();
        const data = this.form.getRawValue();
        const compareTime = this.compareDateTime(data.start_date, data.end_date);
        console.log(data);
        if (compareTime) {
        if (this.new_weekends.length > 0) {
            data.start_date = formatOnlyTime(data.start_date);
            data.end_date = formatOnlyTime(data.end_date);
            this.submitting = true;
            const postData = {
                office_hour_type: 'Fixed Time',
                start_time: data.start_date,
                end_time: data.end_date,
                weekends: this.new_weekends
            };
            console.log(postData);
            this.service.updateOfficeTime(postData).toPromise().then(res => {
                this.submitting = false;
                if (res.code === 200) {
                    this.router.navigate(['/', 'dashboard', 'settings', 'office', 'day-time'], {state: {alertStatus: true}}).catch(err => {
                        console.log(err);
                    });
                } else {
                    this.error_message = res.message;
                    this.openErrorModal();
                }
            }).catch(err => {
                this.submitting = false;
                this.pop.open(getErrorMessage(err));
            });
        } else {
            this.error_message = 'Please Select At Least One Weekend';
            this.openErrorModal();
        }
      }
    }

    onCheckChange($event: MatCheckboxChange) {
        console.log($event.source.value, $event.checked);
        if (!this.new_weekends.includes($event.source.value)) {
            this.new_weekends.push($event.source.value);
        } else {
            const index = this.new_weekends.indexOf($event.source.value);
            if (index > -1) {
                this.new_weekends.splice(index, 1);
            }
        }
        console.log(this.new_weekends);
    }

    compareDateTime(start_time, end_time) {
        if (start_time && end_time) {
           if (start_time.getTime() > end_time.getTime()) {
             this.error_message = 'Start Time Must Be Less Than End Time';
             this.openErrorModal();
             return false;
           } else {
              return true;
           }
        } else {
            this.error_message = 'Please Fill Start Time and End Time Correctly';
            this.openErrorModal();
            return false;
        }
    }

    openErrorModal() {
        const data = {
            type: 'failure',
            title: 'Error Message',
            text: this.error_message,
            actionText: 'Close'
        };

        this.dialog.open(ConfirmModalComponent, {
            data,
            width: '540px',
            maxWidth: '540px',
            height: 'auto',
            panelClass: 'dialog-confirmation'
        });
    }
    ngOnDestroy() {
        this.dashboardSharedService.changeBreadcrumb(false);
    }

}
