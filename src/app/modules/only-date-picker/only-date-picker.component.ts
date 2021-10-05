import {
    Component,
    ElementRef,
    forwardRef,
    InjectionToken,
    Injector, Input,
    OnInit,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {DatePickerService} from "./date-picker.service";
import {OverlayRef} from "@angular/cdk/overlay";
import {ComponentPortal, PortalInjector} from "@angular/cdk/portal";
import {DatePickerComponent} from "./date-picker/date-picker.component";
import {CONTAINER_DATA} from "../../types/general";

@Component({
    selector: 'app-only-date-picker',
    templateUrl: './only-date-picker.component.html',
    styleUrls: ['./only-date-picker.component.scss'],
    providers: [
        {provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => OnlyDatePickerComponent)}
    ]
})
export class OnlyDatePickerComponent implements OnInit, ControlValueAccessor {
    change: any;
    @ViewChild('input') input: ElementRef;
    selectedDates: number[] = [];
    overlayRef: OverlayRef;
    @Input() placeholder: string = 'Select a day';

    constructor(
        private service: DatePickerService,
        private _injector: Injector,
        private viewContainer: ViewContainerRef
    ) {
        this.service.Behavior.asObservable().subscribe(res => {
            this.selectedDates = res;
            this.onChange();
        })
    }

    registerOnChange(fn: any): void {
        this.change = fn;
        this.onChange();
    }

    createInjector(dataToPass): PortalInjector {
        const injectorTokens = new WeakMap();
        injectorTokens.set(CONTAINER_DATA, dataToPass);
        return new PortalInjector(this._injector, injectorTokens);
    }

    registerOnTouched(fn: any): void {
    }

    setDisabledState(isDisabled: boolean): void {
    }

    onChange() {
        if (this.change) {
            this.change(this.selectedDates);
        }
    }

    writeValue(obj: any): void {
        this.selectedDates = obj;
    }

    openDate(input: HTMLInputElement) {
        const datePortal = new ComponentPortal(DatePickerComponent, this.viewContainer,
            this.createInjector({dates: this.selectedDates}));
        this.overlayRef = this.service.open(input, datePortal);
    }

    close() {
    }

    ngOnInit() {
    }


}
