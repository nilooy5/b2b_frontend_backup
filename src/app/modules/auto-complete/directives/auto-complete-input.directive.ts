import {Directive, ElementRef, HostBinding, HostListener, Input, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Directive({
  selector: '[appAutoCompleteInput]',
  exportAs: 'appAutoCompleteInput',
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: AutoCompleteInputDirective, multi: true}]
})
export class AutoCompleteInputDirective implements ControlValueAccessor, OnInit {
  @HostBinding('class.auto-complete-input') input = true;
  @HostBinding('placeholder') ph = '';
  @Input('placeholder') placeholder = '';
  onFocus: Subject<FocusEvent> = new Subject();
  onBlur: Subject<Event> = new Subject();
  onKeyUp: Subject<KeyboardEvent> = new Subject();
  private onChange: any;

  constructor(public el: ElementRef) {
  }

  @HostListener('focus', ['$event']) OnFocus($event: FocusEvent) {
    this.onFocus.next($event);
  }

  @HostListener('blur', ['$event']) OnBlur($event: Event) {
    this.onBlur.next($event);
  }

  @HostListener('keyup', ['$event']) OnKeyUp($event: KeyboardEvent) {
    this.onChange(this.el.nativeElement.value);
    this.onKeyUp.next($event);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(obj: any): void {
    this.el.nativeElement.value = obj;
  }

  writeChange(val) {
    console.log(val);
    this.el.nativeElement.value = val;
    this.onChange(val);
  }

  writePlaceholder(val) {
    this.ph = val;
  }

  resetPlaceHolder() {
    this.ph = this.placeholder;
  }

  ngOnInit(): void {
    this.ph = this.placeholder;
  }
}
