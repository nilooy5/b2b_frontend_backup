import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    OnChanges, OnDestroy,
    OnInit, QueryList,
    SimpleChanges, ViewChild,
    ViewChildren
} from '@angular/core';
import {addDays, addHours, differenceInHours, isToday, startOfDay} from "date-fns";
import {Trip, TripsDetails} from "../../types/fleet";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-fleet-calendar',
    templateUrl: './fleet-calendar.component.html',
    styleUrls: ['./fleet-calendar.component.scss']
})
export class FleetCalendarComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

    @Input() startDate: Date = new Date();
    @Input() viewType: 'week' | 'month' | 'day' = 'month';
    @Input() viewItems: TripsDetails[] = [];
    dates: Date[];
    span = {
        week: 7,
        month: 30,
        day: 24
    };
    @ViewChildren('ruler') ruler: QueryList<ElementRef>;
    @ViewChild('viewContent') content: ElementRef;
    rulerSubscription: Subscription;

    constructor() {
    }

    ngOnInit() {
        this.generateCalendar();
    }

    generateCalendar() {
        this.dates = [];
        if (this.viewType === 'month') {
            for (let i = 0; i < this.span[this.viewType]; i++) {
                const day = addDays(this.startDate, i);
                this.dates.push(day);
            }
        } else if (this.viewType === 'week') {
            for (let i = 0; i < this.span[this.viewType]; i++) {
                const day = addDays(this.startDate, i);
                this.dates.push(day);
            }
        } else if (this.viewType === 'day') {
            this.startDate = startOfDay(this.startDate);
            for (let i = 0; i < this.span[this.viewType]; i++) {
                const day = addHours(this.startDate, i);
                this.dates.push(day);
            }
        }
    }

    getGridItemClass(item: Trip, index: number) {
        try {
            const startDate = new Date(Date.parse(item.start_date));
            const endDate = new Date(Date.parse(item.end_date));
            const isActive = isToday(startDate);
            return this.generateGridClass(startDate, endDate, isActive, index);
        } catch (e) {
            return {'': ''}
        }
    }

    generateGridClass(startDate: Date, endDate: Date, isActive: boolean, index: number) {
        return this[this.viewType + 'Grid'](startDate, endDate, isActive, index);
    }

    monthGrid(startDate: Date, endDate: Date, isActive: boolean, index: number) {
        return this.generateDayGrid(startDate, endDate, isActive, index);
    }

    weekGrid(startDate: Date, endDate: Date, isActive: boolean, index: number) {
        return this.generateDayGrid(startDate, endDate, isActive, index);
    }

    dayGrid(startDate: Date, endDate: Date, isActive: boolean, index: number) {
        let startIndex = differenceInHours(startDate, this.startDate) + 1;
        if (startDate.getDate() - this.startDate.getDate() > 0) startIndex = 1;
        let span = differenceInHours(endDate, this.startDate);
        let endIndex = startIndex + span + 1;
        if (endIndex < startIndex) endIndex = startIndex + 1;
        const activeColor = isActive ? 'green' : 'orange';
        return {
            'grid-column-start': startIndex + '',
            'grid-row-start': '1',
            'grid-row-end': '1',
            'grid-column-end': (endIndex > this.span[this.viewType]) ? this.span[this.viewType] + 1 : endIndex + '',
            'border-color': activeColor,
            'z-index': '' + index
        }
    }

    generateDayGrid(startDate: Date, endDate: Date, isActive: boolean, index: number) {
        let startIndex = startDate.getDate() - this.startDate.getDate() + 1;
        let span = endDate.getDate() - startDate.getDate();
        let endIndex = startIndex + span + 1;
        if (endIndex < startIndex) endIndex = startIndex + 1;
        if (startIndex < 1) startIndex = 1;
        const activeColor = isActive ? 'green' : 'orange';
        return {
            'grid-column-start': startIndex + '',
            'grid-row-start': '1',
            'grid-row-end': '1',
            'grid-column-end': (endIndex > this.span[this.viewType]) ? this.span[this.viewType] : endIndex + '',
            'border-color': activeColor,
            'z-index': '' + index
        }
    }

    dropped(event) {
        event.source.reset();
        // event.source.element.nativeElement.style.transform = 'translate3d(0,0,0)'
    }

    onResizeEnd(event) {
        console.log(event);
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.generateCalendar();
    }

    ngAfterViewInit(): void {
        this.setRuler();
    }

    setRuler() {
        const contentHeight = this.content.nativeElement.getBoundingClientRect();
        this.ruler.forEach(item => {
            item.nativeElement.style.height = contentHeight.height + 'px';
        });
        this.rulerSubscription = this.ruler.changes.subscribe(value => {
            const contentHeight = this.content.nativeElement.getBoundingClientRect();
            value.forEach(item => {
                item.nativeElement.style.height = contentHeight.height + 'px';
            })
        });
    }

    ViewClass() {
        return {
            'month': this.viewType === 'month',
            'week': this.viewType === 'week',
            'day': this.viewType === 'day'
        }
    }

    ngOnDestroy(): void {
        if (this.rulerSubscription) {
            this.rulerSubscription.unsubscribe();
        }
    }
}
