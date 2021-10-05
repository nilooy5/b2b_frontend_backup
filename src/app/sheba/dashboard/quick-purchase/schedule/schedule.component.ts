import {Component, DoCheck, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {OrderService} from '../../../../services/order-service/order.service';
import {ActivatedRoute} from '@angular/router';
import {AmplitudeService} from '../../../../services/amplitude.service';
import {StorageService} from '../../../../services/storage.service';


@Component({
    selector: 'app-schedule',
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

    dates: any[];
    selectedDate: any;
    times: any[] = [];
    selectedTime: any;

    constructor(
        private route: ActivatedRoute,
        public orderService: OrderService,
        private amplitude: AmplitudeService,
        private storage: StorageService
    ) {
        this.setData();
    }

    ngOnInit() {
    }

    setData() {
        this.route.data.subscribe(res => {
            this.dates = res.dates as any[];
            this.times = this.orderService.Date ? this.dates.find(date => this.getApiFormat(date.value) == this.orderService.Date).slots : this.dates[0].slots;
            this.orderService.Time = this.orderService.Time ? this.orderService.Time : this.times.filter(time => time.is_valid)[0];
        });
    }

    selectDate(date) {
        this.orderService.Date = this.selectedDate = date.value;
        this.times = this.dates.find(d => d.value == this.orderService.Date) ? this.dates.find(d => d.value == this.orderService.Date).slots : [];
        this.orderService.Time = this.orderService.Time ? this.orderService.Time : this.times.filter(time => time.is_valid)[0];
    }

    selectTime(time) {
        if (time.is_valid) { this.orderService.Time = time; }
        this.fireAmplitudeEvent(this.orderService.Time.value);
    }

    myFilter = (d: Date): boolean => {
        const day = d.getDate() + '' + d.getMonth();
        const dateValues = [];
        this.dates.forEach(date => {
            const _d = new Date(date.value);
            dateValues.push(_d.getDate() + '' + _d.getMonth());
        });
        // Prevent Saturday and Sunday from being selected.
        return dateValues.includes(day);
    }

    initialDate() {
        return this.orderService.Date ? new Date(this.orderService.Date) : null;
    }

    initialTime() {

    }

    getApiFormat(date) {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) { month = '0' + month; }
        if (day.length < 2) { day = '0' + day; }

        return [year, month, day].join('-');
    }

    noValidTime() {
        return this.times.findIndex(t => t.is_valid) === -1;
    }

    fireAmplitudeEvent(schedule_time) {
        this.amplitude.fireCustomEvent(this.amplitude.events.quick_purchase_schedule, {
            business_id: this.storage.user.business_id,
            name: this.storage.user.name,
            service_id: this.orderService.Services && this.orderService.Services.length ?
                this.orderService.Services[0].id : null,
            service_name: this.orderService.Services && this.orderService.Services.length ?
                this.orderService.Services[0].name : null,
            SP_name: this.orderService.Partner.name,
            time: schedule_time,
        });
    }

}
