import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import * as dateFns from 'date-fns';
import {IDateRange} from './date-range';


@Component({
    selector: 'app-date-range-picker',
    templateUrl: './date-range-picker.component.html',
    styleUrls: ['./date-range-picker.component.scss']
})
export class DateRangePickerComponent implements OnInit {

    public opened: false | 'from' | 'to';
    public datePick: IDateRange;
    public range: 'tm' | 'lm' | 'lw' | 'tw' | 'ty' | 'ly';
    public moment: Date;
    public dayNames: string[];
    public dates: Date[];
    @Input() public themeColor: 'green' | 'teal' | 'grape' | 'red' | 'gray';
    @Input() private dateRange: IDateRange;
    @Output() private dateRangeChange = new EventEmitter<IDateRange>();
    @Input() startText = 'Start';
    @Input() endText = 'End';
    @Input() minDate: Date = new Date('1900-1-1');
    @Input() minRange = 1;
    @Input() rangeText: 'D' | 'N' = 'D';
    @Input() infoText: false | string;
    @Input() minimal: boolean = false;
    dateRangeText: string;
    @Input() theme: string;
    @Input() allowSameDate: boolean = false;

    constructor(
        private elementRef: ElementRef) {
        this.infoText = false;
    }

    public ngOnInit() {
        this.opened = false;
        this.dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        this.datePick = {
            from: null,
            to: null
        };
        if (this.dateRange &&
            this.dateRange.from &&
            this.dateRange.to) {
            this.datePick = Object.assign({}, this.datePick, this.dateRange);
            this.moment = new Date(this.datePick.from);
            this.generateCalendar();
            this.setDateRangeText();
        } else {
            this.selectRange();
            this.setDateRangeText();
        }
    }

    private setDateRangeText() {
        this.dateRangeText = dateFns.differenceInCalendarDays(this.datePick.to, this.datePick.from) + '';
    }

    public toggleCalendar(selection: false | 'from' | 'to'): void {
        if (this.opened && this.opened !== selection) {
            this.opened = selection;
        } else {
            this.opened = this.opened ? false : selection;
        }
        if (selection && this.datePick[selection]) {
            const diffMonths = dateFns.differenceInCalendarMonths(
                this.datePick[selection], this.moment);

            if (diffMonths !== 0) {
                this.moment = dateFns.addMonths(this.moment, diffMonths);
                this.generateCalendar();
            }
        }
    }

    public selectRange(range?: 'tm' | 'lm' | 'lw' | 'tw' | 'ty' | 'ly'): void {
        let today = dateFns.startOfDay(new Date());
        switch (range) {
            case 'tm':
                this.datePick = {
                    from: dateFns.startOfMonth(today),
                    to: dateFns.endOfMonth(today)
                };
                break;
            case 'lm':
                today = dateFns.subMonths(today, 1);
                this.datePick = {
                    from: dateFns.startOfMonth(today),
                    to: dateFns.endOfMonth(today)
                };
                break;
            case 'lw':
                today = dateFns.subWeeks(today, 1);
                this.datePick = {
                    from: dateFns.startOfWeek(today),
                    to: dateFns.endOfWeek(today)
                };
                break;
            case 'tw':
                this.datePick = {
                    from: dateFns.startOfWeek(today),
                    to: dateFns.endOfWeek(today)
                };
                break;
            case 'ty':
                this.datePick = {
                    from: dateFns.startOfYear(today),
                    to: dateFns.endOfYear(today)
                };
                break;
            case 'ly':
                today = dateFns.subYears(today, 1);
                this.datePick = {
                    from: dateFns.startOfYear(today),
                    to: dateFns.endOfYear(today)
                };
                break;
            default:
                this.datePick = {
                    from: today,
                    to: dateFns.addDays(today, this.minRange)
                };
        }
        this.range = range;
        this.moment = new Date(this.datePick.from);
        this.generateCalendar();
    }

    public generateCalendar(): void {
        this.dates = [];
        const firstDate = dateFns.startOfMonth(this.moment);
        const start = 0 - (dateFns.getDay(firstDate) + 7) % 7;
        const end = 41 + start;

        for (let i = start; i <= end; i += 1) {
            const day = dateFns.addDays(firstDate, i);
            this.dates.push(day);
        }
    }

    public selectDate(date: Date): void {

        if (this.opened === 'from') {
            if (this.datePick && this.datePick.to &&
                dateFns.compareDesc(date, dateFns.addDays(this.datePick.to, -this.minRange + 1)) < 1) {
                this.dateRangeChange.emit(Object.assign({}, this.datePick));
            } else {
                this.datePick.from = date;
                this.dateRangeChange.emit(Object.assign({}, this.datePick));
            }
            this.setDateRangeText();
        }

        if (this.opened === 'to') {
            if (!this.allowSameDate && (dateFns.compareAsc(dateFns.addDays(this.datePick.from, this.minRange), date) > 0)) {
                return;
            }
            if (this.allowSameDate &&  this.datePick && this.datePick.from &&
                dateFns.compareAsc(date, this.datePick.from) < 1) {
                this.dateRangeChange.emit(Object.assign({}, this.datePick));
            } else {
                this.datePick.to = date;
                this.dateRangeChange.emit(Object.assign({}, this.datePick));
            }
            this.setDateRangeText();
        }
    }

    public prevMonth(): void {
        this.moment = dateFns.addMonths(this.moment, -1);
        this.generateCalendar();
    }

    public nextMonth(): void {
        this.moment = dateFns.addMonths(this.moment, 1);
        this.generateCalendar();
    }

    public isWithinRange(day: Date): boolean {
        return this.datePick.from && this.datePick.to
            && dateFns.isWithinRange(day, this.datePick.from, this.datePick.to);
    }

    public isDateRangeFrom(day: Date): boolean {
        return dateFns.isSameDay(day, this.datePick.from);
    }

    public isDateRangeTo(day: Date): boolean {
        return dateFns.isSameDay(day, this.datePick.to);
    }

    public isInvalid(day: Date): boolean {
        return dateFns.compareAsc(day, dateFns.addDays(this.minDate, -1)) > 0;
    }

    @HostListener('document:click', ['$event'])
    private handleBlurClick(e: MouseEvent) {
        const target = e.srcElement || e.target;
        if (!this.elementRef.nativeElement.contains(e.target)
            && !(<Element>target).classList.contains('yk-day-num')) {
            this.opened = false;
        }
    }

}
