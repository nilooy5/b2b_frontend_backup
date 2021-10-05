import {AfterContentInit,  Component, ContentChild, OnInit, QueryList} from '@angular/core';
import {AutoCompleteInputDirective} from './directives/auto-complete-input.directive';
import {AutoCompleteService} from './services/auto-complete.service';
import {AutoCompleteDirective} from './directives/auto-complete.directive';
import {AutoCompleteItemDirective} from './directives/auto-complete-item.directive';
import {ListKeyManager} from '@angular/cdk/a11y';
import {DOWN_ARROW, ENTER, UP_ARROW} from '@angular/cdk/keycodes';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss']
})
export class AutoCompleteComponent implements OnInit, AfterContentInit {

  @ContentChild(AutoCompleteInputDirective) input: AutoCompleteInputDirective;
  @ContentChild(AutoCompleteDirective) auto: AutoCompleteDirective;
  keyboardEventsManager: ListKeyManager<AutoCompleteItemDirective>;
  lastActiveItem: number;
  keyUpSubscription: Subscription;
  itemSubscription: Subscription;

  constructor(private service: AutoCompleteService) {
  }

  ngOnInit() {

  }

  ngAfterContentInit(): void {
    this.input.onFocus.subscribe(res => {
      this.auto.show(this.input.el);
    });
    this.itemSubscription = this.service.itemObserver().subscribe(res => {
      if (res) {

        this.keyboardEventsManager = new ListKeyManager<AutoCompleteItemDirective>(res).withWrap();
        if (this.keyUpSubscription) {
          this.keyUpSubscription.unsubscribe();
        }
        this.keyUpSubscription = this.input.onKeyUp.subscribe(event => {
          const active = this.keyboardEventsManager.activeItemIndex;
          this.auto.detach();
          this.auto.show(this.input.el);
          if (active >= 0) {
            this.keyboardEventsManager.setActiveItem(active);
          }
          this.handleKeyboardEvent(event, res);
        });
      }
    });
    this.input.onBlur.subscribe(e => {
      this.auto.detach();
      this.keyboardEventsManager.updateActiveItem(-1);
    });
  }

  handleKeyboardEvent(event: KeyboardEvent, items: QueryList<AutoCompleteItemDirective>): boolean {
    event.stopImmediatePropagation();
    if (this.keyboardEventsManager) {
      if (event.keyCode === DOWN_ARROW || event.keyCode === UP_ARROW) {
        this.handleKeyDown(event, items);
        this.input.writePlaceholder(this.keyboardEventsManager.activeItem.item);
        return false;
      } else if (event.keyCode === ENTER) {
        // when we hit enter, the keyboardManager should call the selectItem method of the `ListItemComponent`
        if (this.keyboardEventsManager.activeItem) {
          this.keyboardEventsManager.activeItem.selectItem();
          this.input.writeChange(this.keyboardEventsManager.activeItem.getOption());
          this.input.resetPlaceHolder();
          this.auto.detach();
        }
        return false;
      }
    }
  }


  handleKeyDown(event: KeyboardEvent, items: QueryList<AutoCompleteItemDirective>) {

    this.keyboardEventsManager.onKeydown(event);
    // passing the event to key manager so we get a change fired
    if (this.keyboardEventsManager.activeItem) {
      if (this.lastActiveItem === this.keyboardEventsManager.activeItemIndex) {
        this.lastActiveItem === 0 ? this.keyboardEventsManager.updateActiveItem(items.length - 1)
          : this.keyboardEventsManager.updateActiveItem(0);
      }
      this.keyboardEventsManager.activeItem.setActive(this.keyboardEventsManager.activeItemIndex);
      this.lastActiveItem = this.keyboardEventsManager.activeItemIndex;
    }
  }
}
