import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from '../../../../services/subscription-service/subscription.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import '../../../../helpers/extends';
import {Router} from '@angular/router';
import * as moment from 'moment';

@Component({
    selector: 'app-subscription-schedule',
    templateUrl: './subscription-schedule.component.html',
    styleUrls: ['./subscription-schedule.component.scss']
})
export class SubscriptionScheduleComponent implements OnInit {

    minDate: NgbDateStruct;
    maxDate: NgbDateStruct;
    today: Date;
    nextMonthLastDate: any;
    nextMonthDay: Date;
    currentMonth: string;
    nextMonth: string;
    buttons: any;
    selectedButton: number;
    selectedServices: Array<any>;
    selectedDates: Array<any> = [];
    minimumDaysToSelect: number;

    constructor(
        private subscriptionService: SubscriptionService,
        private router: Router
    ) {
        this.selectedServices = subscriptionService.Services;
        this.today = new Date();
        this.nextMonthDay = new Date().addDays(29);
        enum buttons {
            Next30Days,
            CurrentMonth,
            NextMonth
        }
        this.buttons = buttons;
        this.minDate = this.today.toNgbDateStruct();
        // this.maxDate = this.nextMonthDay.toNgbDateStruct();
        this.nextMonthLastDate = moment(new Date()).add(1, 'months').endOf('month');
        // @ts-ignore
        this.maxDate = this.nextMonthLastDate._d.toNgbDateStruct();
    }

    ngOnInit() {
        if (!this.subscriptionService.Subscription) {
            this.router.navigate(['/', 'dashboard', 'order', 'subscription']).catch(err => {
                console.log(err);
            });
        }

        if (this.subscriptionService.Dates && this.subscriptionService.Dates) {
            this.subscriptionService.Dates.forEach(date => {
                this.selectedDates.push(new Date(date).toNgbDateStruct());
            });
        }

        this.minimumDaysToSelect = this.subscriptionService.Subscription.min_monthly_qty;
        this.currentMonth = this.today.getMonthName();
        this.nextMonth = this.nextMonthDay.getMonthName();
    }

    handleSelectedDates(dates: Array<NgbDateStruct>) {
        this.selectedDates = dates || [];
        this.subscriptionService.Dates = dates.map(date => new Date().fromNgbDateStruct(date).toMySqlFormat()) || [];
    }

    quickSelect(button) {
        this.selectedButton = button;
        if (button === this.buttons.Next30Days) {
            this.handleSelectedDates(this.getNext30Days());
        } else if (button === this.buttons.CurrentMonth) {
            this.handleSelectedDates(this.getCurrentMonthDays());
        } else if (button === this.buttons.NextMonth) {
            this.handleSelectedDates(this.getNextMonthDays());
        }
    }

    private getNext30Days(): NgbDateStruct[] {
        return this.getDaysFromAndTo(this.today, this.nextMonthDay);
    }

    private getCurrentMonthDays(): NgbDateStruct[] {
        return this.getDaysFromAndTo(this.today, this.today.copy().lastDayOfMonth());
    }

    private getNextMonthDays(): NgbDateStruct[] {
        return this.getDaysFromAndTo(this.nextMonthDay.copy().firstDayOfMonth(), this.nextMonthLastDate._d);
    }

    private getDaysFromAndTo(from: Date, to: Date): NgbDateStruct[] {
        let dates: NgbDateStruct[] = [];
        let date = from.copy();
        while (date.isSmallerThanOrEqualTo(to)) {
            dates.push(date.toNgbDateStruct());
            date = date.addDays(1);
        }
        return dates;
    }

    deselectAllDate() {
        if (this.subscriptionService.Dates && this.subscriptionService.Dates) {
            this.selectedButton = null;
            this.subscriptionService.Dates = [];
            this.selectedDates = [];
        }

    }

}
