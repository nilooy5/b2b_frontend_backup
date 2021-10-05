import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-schedule-picker',
    templateUrl: './schedule-picker.component.html',
    styleUrls: ['./schedule-picker.component.scss']
})
export class SchedulePickerComponent implements OnInit {
    @Input() times: any[] = [];
    @Input() selectedTime: any[] = [];
    @Output() select: EventEmitter<any> = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

    selectSlot(time) {
        this.select.emit(time);
    }
}
