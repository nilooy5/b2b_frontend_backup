import {
    AfterViewInit,
    Component, ElementRef, EventEmitter,
    forwardRef, HostBinding, HostListener, Inject,
    Input,
    OnInit, Output,
    QueryList,
    TemplateRef, ViewChild,
    ViewChildren,
    ViewContainerRef
} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";
import {ConnectionPositionPair, Overlay, OverlayRef} from "@angular/cdk/overlay";
import {TemplatePortal} from "@angular/cdk/portal";
import {SelectPickerItemComponent} from "../select-picker-item/select-picker-item.component";
import {ActiveDescendantKeyManager} from "@angular/cdk/a11y";
import {ENTER} from "@angular/cdk/keycodes";
import {of, Subscription} from "rxjs";
import {DOCUMENT} from "@angular/common";
import {delay} from "rxjs/operators";
import {DomSanitizer, SafeStyle} from "@angular/platform-browser";

@Component({
    selector: 'app-select-picker-with-search',
    templateUrl: './select-picker-with-search.component.html',
    styleUrls: ['./select-picker-with-search.component.scss'],
    providers: [
        {provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => SelectPickerWithSearchComponent)}
    ]
})

export class SelectPickerWithSearchComponent implements OnInit, ControlValueAccessor, AfterViewInit {
    OnChange: any;
    @Input() items: any[] = [];
    value: any;
    @Input() bindTitle = 'title';
    @Input() bindImage = 'img';
    @Input() bindSubtitle = 'sub_title';
    @Input() bindValue = 'id';
    @Input() placeholder = "Select Item";
    @Input() queryFields;
    @Input() bg = 'white';
    search: string;
    overlayRef: OverlayRef;
    positionStrategy: any;
    @ViewChildren(SelectPickerItemComponent) itemList: QueryList<SelectPickerItemComponent>;
    private keyManager: ActiveDescendantKeyManager<{}>;
    onChange: any;
    sub: Subscription;
    selectedItem: any;
    selector: FormControl = new FormControl();
    inputStyle: { [p: string]: string };
    tabIndex = 0;
    @HostBinding('tabindex') index = 0;
    @HostBinding('style') style: SafeStyle;
    @ViewChild('inputItem') inputDiv: ElementRef;
    @ViewChild('templateItem') templateDiv: TemplateRef<any>;
    @Output() selectedEmployee = new EventEmitter<any>();

    constructor(
        private overlay: Overlay, private vRef: ViewContainerRef,
        @Inject(DOCUMENT) public document: Document,
        private sanitizer: DomSanitizer
    ) {
        this.style = this.sanitizer.bypassSecurityTrustStyle('outline:none')
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.OnChange = fn
    }

    setDisabledState(isDisabled: boolean): void {
    }

    writeValue(obj: any): void {
        if (this.items.length) {
            const item = this.items.find(item => {
                return item[this.bindValue] == obj;
            });
            if (item) {
                this.setItem(item);
            }
        }
    }

    showDrop(inputItem: HTMLDivElement, ref: TemplateRef<any>) {
        const portal = new TemplatePortal(ref, this.vRef);
        const strategy = this.overlay.position().flexibleConnectedTo(inputItem);
        this.positionStrategy = {
            positionStrategy: strategy.withPositions(SelectPickerWithSearchComponent.getPositions()).withPush(false),
            hasBackdrop: true,
            backdropClass: 'search-select',
            disposeOnNavigation: true,
            maxHeight: '400px',
            maxWidth: '400px',
            minWidth: inputItem.clientWidth + 'px',
            scrollStrategy: this.overlay.scrollStrategies.reposition()
        };
        this.overlayRef = this.overlay.create(this.positionStrategy);
        this.overlayRef.attach(portal);
        this.overlayRef.backdropClick().subscribe(res => {
            this.closeOverlay();
        });
        of(document.getElementById('searchElement')).pipe(delay(200)).subscribe(res => {
            res.focus();
        });
        ref.elementRef.nativeElement.addEventListener('blur', this.OnBlur.bind(this));
    }

    setItem(item) {
        const value = item[this.bindValue];
        if (this.OnChange) {
            this.onChange(value);
        }
        this.value = value ? value : null;
        this.selectedItem = item;
        this.setSelected(item);
        this.selector.setValue(value);
    }

    setSelected(item) {
        this.items.forEach((sItem, index) => {
            this.items[index].selected = item.id == sItem.id;
        });
    }

    ngOnInit() {
        this.selector.disable();
        this.inputStyle = {
            background: this.bg
        }
    }

    OnClick(item) {
        this.selectedEmployee.emit(item);
        this.setItem(item);
        this.closeOverlay();
    }

    static getPositions(): ConnectionPositionPair[] {
        return [
            {
                originX: 'start',
                originY: 'bottom',
                overlayX: 'start',
                overlayY: 'top',
            },
            {
                originX: 'start',
                originY: 'top',
                overlayX: 'start',
                overlayY: 'top',
            }

        ]
    }

    closeOverlay() {
        if (this.overlayRef) {
            this.overlayRef.dispose();
            this.search = null;
        }
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    ngAfterViewInit(): void {
        this.sub = this.itemList.changes.subscribe(res => {
            this.keyManager = new ActiveDescendantKeyManager(res).withWrap()
                .withTypeAhead();
        });
    }

    onKeydown(event) {
        if (event.keyCode === ENTER) {
            const item = this.keyManager.activeItem as SelectPickerItemComponent;
            this.setItem(item.item);
            this.closeOverlay();
        } else {
            this.keyManager.onKeydown(event);
        }
    }

    @HostListener('focus') onFocus() {
        this.showDrop(this.inputDiv.nativeElement as HTMLDivElement, this.templateDiv);

    }

    OnBlur() {
        setTimeout(() => {
            this.closeOverlay();
            this.templateDiv.elementRef.nativeElement.removeEventListener('blur', this.OnBlur);
            document.querySelector('body').focus();
        }, 200);
    }

    resetSelect() {
        this.selector.reset();
    }
}
