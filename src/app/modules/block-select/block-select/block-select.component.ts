import {
    AfterViewInit,
    Component,
    ElementRef,
    forwardRef, HostBinding, HostListener,
    Input, OnDestroy,
    OnInit,
    Renderer2,
    ViewChild
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {of} from "rxjs";
import {delay} from "rxjs/operators";
import {DashboardResolveService} from "../../../sheba/dashboard/dashboard-resolve.service";

@Component({
    selector: 'app-block-select',
    templateUrl: './block-select.component.html',
    styleUrls: ['./block-select.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => BlockSelectComponent),
        }
    ]
})
export class BlockSelectComponent implements OnInit, ControlValueAccessor, AfterViewInit, OnDestroy {
    change: any;
    @Input() items: any[];
    @Input() bindValue: string = 'id';
    @Input() bindTitle: string = 'title';
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
        this.hasOverflowRight = true;
        this.service.DashboardBehavior.asObservable().pipe(delay(1000)).subscribe(() => {
            this.initModel();
        })
    }

    ngAfterViewInit(): void {
        this.listeners[0]=this.container.nativeElement.addEventListener('scroll', this.onScrollContent.bind(this));
        this.listeners[1]=this.container.nativeElement.addEventListener('resize', this.onResize.bind(this));
        of(null).pipe(delay(1000)).toPromise().then(() => {
            this.initModel();
        })
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
        this.container.nativeElement.scrollTo({left: this.scrolled, top: 0, behavior: "smooth"})
    }

    previous() {
        this.scrolled -= 260;
        if (this.scrolled < 0) this.scrolled = 0;
        this.container.nativeElement.scrollTo({left: this.scrolled, top: 0, behavior: "smooth"})
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
