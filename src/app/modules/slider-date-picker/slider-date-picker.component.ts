import {AfterViewInit, Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {DashboardResolveService} from '../../sheba/dashboard/dashboard-resolve.service';
import {delay} from 'rxjs/operators';
import {of} from 'rxjs';
import * as moment from 'moment';

@Component({
    selector: 'app-slider-date-picker',
    templateUrl: './slider-date-picker.component.html',
    styleUrls: ['./slider-date-picker.component.scss']
})
export class SliderDatePickerComponent implements OnInit, AfterViewInit, OnDestroy  {
    @Input() dates: any[] = [];
    @Input() selectedDate: any = null;
    @Output() select: EventEmitter<any> = new EventEmitter();
    @ViewChild('content') content: ElementRef<any>;
    @ViewChild('container') container: ElementRef<any>;
    @HostBinding('style.display') display = 'block';
    hasOverflowRight: boolean = false;
    hasOverflowLeft: boolean = false;
    scrolled: number = 0;
    contentWidth: number = 0;
    containerWidth: number = 0;
    contentScroll: number = 0;
    scrollable: number = 0;
    listeners = [];

    constructor(
        private service: DashboardResolveService
    ) { }

    ngOnInit() {
        this.hasOverflowRight = true;
        this.service.DashboardBehavior.asObservable().pipe(delay(1000)).subscribe(() => {
            this.initModel();
        });
    }

    selectDate(date) {
        this.select.emit(date);
    }

    ngAfterViewInit(): void {
        this.listeners[0] = this.container.nativeElement.addEventListener('scroll', this.onScrollContent.bind(this));
        this.listeners[1] = this.container.nativeElement.addEventListener('resize', this.onResize.bind(this));
        of(null).pipe(delay(1000)).toPromise().then(() => {
            this.initModel();
        });
    }

    initModel() {
        this.containerWidth = this.container.nativeElement.clientWidth;
        this.contentWidth = this.content.nativeElement.clientWidth;
        this.scrollable = this.contentWidth - this.containerWidth;
        this.hasOverflowRight = this.contentWidth >= this.containerWidth;
    }

    onScrollContent(e) {
        this.contentScroll = e.target.scrollLeft;
        this.hasOverflowLeft = this.contentScroll > 0;
        this.scrolled = this.contentScroll;
        this.hasOverflowRight = this.scrolled < this.scrollable;
    }

    next() {
        this.scrolled += 260;
        if (this.scrolled > this.scrollable) this.scrolled = this.scrollable;
        this.container.nativeElement.scrollTo({left: this.scrolled, top: 0, behavior: 'smooth'});
    }

    previous() {
        this.scrolled -= 260;
        if (this.scrolled < 0) this.scrolled = 0;
        this.container.nativeElement.scrollTo({left: this.scrolled, top: 0, behavior: 'smooth'});
    }

    @HostListener('window:resize', ['$event'])
    onResize($event) {
        this.initModel();
    }

    ngOnDestroy(): void {
        this.container.nativeElement.removeEventListener('scroll',this.listeners[0]);
        this.container.nativeElement.removeEventListener('resize',this.listeners[1]);
    }

    getMonthDate(date) {
        return moment(date).date() < 10 ? ('0' + moment(date).date()) : moment(date).date();
    }

    getWeekDay(date) {
        const weekdays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
        return moment(0, 'HH').diff(date, 'days') === 0 ?
            'TODAY' :
            weekdays[moment(date).isoWeekday() - 1];
    }
}
