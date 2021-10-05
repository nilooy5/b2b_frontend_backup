import {AfterViewInit, Component, ElementRef, forwardRef, HostBinding, HostListener, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {DashboardResolveService} from '../../sheba/dashboard/dashboard-resolve.service';
import {delay} from 'rxjs/operators';
import {of} from 'rxjs';

@Component({
    selector: 'app-ng-simple-slider',
    templateUrl: './ng-simple-slider.component.html',
    styleUrls: ['./ng-simple-slider.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => NgSimpleSliderComponent),
        }
    ]
})
export class NgSimpleSliderComponent implements OnInit, ControlValueAccessor, AfterViewInit, OnDestroy  {
    change: any;
    @Input() items: any[];
    selected: any;
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
    ) {
    }

    ngOnInit() {
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

    registerOnChange(fn: any): void {
        this.change = fn;
    }

    registerOnTouched(fn: any): void {
    }

    selectItem() {
        this.change(this.selected);
    }

    setDisabledState(isDisabled: boolean): void {
    }

    writeValue(obj: any): void {
        this.selected = obj
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

}
