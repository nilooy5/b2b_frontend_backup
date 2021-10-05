import {
  AfterContentInit,
  ContentChild,
  ContentChildren,
  Directive,
  EventEmitter,
  HostBinding, HostListener,
  Input,
  OnInit,
  Output,
  QueryList
} from '@angular/core';
import {AutoCompleteService} from '../services/auto-complete.service';
import {AutoCompleteOptionComponent} from '../auto-complete-option/auto-complete-option.component';
import {Subject} from 'rxjs';

@Directive({
  selector: '[appAutoCompleteItem]'
})
export class AutoCompleteItemDirective implements OnInit, AfterContentInit {

  @HostBinding('class.active') isActive: boolean;
  @HostBinding('class.auto-complete-lists-item') listItem = true;
  @Input() item: any;
  @Input() disabled: boolean;
  @Input() labelKey: string;
  @Output() onSelectItem = new EventEmitter<any>();
  @ContentChild(AutoCompleteOptionComponent) option: AutoCompleteOptionComponent;
  onClick: Subject<PointerEvent> = new Subject();

  constructor(private service: AutoCompleteService) {
  }

  selectItem() {
    this.isActive = true;
    this.onSelectItem.emit(this.item);
  }

  getLabel(): string {
    return this.labelKey ? this.item[this.labelKey] : this.item;
  }

  setActive(i) {
    this.service.items.forEach((item, index) => {
      item.isActive = index === i;
    });
  }

  ngOnInit(): void {
    this.isActive = false;
  }

  getOption() {
    return this.option.value;
  }

  ngAfterContentInit(): void {
  }

  @HostListener('click', ['$event']) OnClick($event) {
    this.selectItem();
    this.onClick.next($event);
  }
}
