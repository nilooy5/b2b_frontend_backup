import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AutoCompleteComponent} from './auto-complete.component';
import {AutoCompleteListsComponent} from './auto-complete-lists/auto-complete-lists.component';
import {AutoCompleteDirective} from './directives/auto-complete.directive';
import {AutoCompleteInputDirective} from './directives/auto-complete-input.directive';
import {AutoCompleteItemDirective} from './directives/auto-complete-item.directive';
import {OverlayModule} from '@angular/cdk/overlay';
import {A11yModule} from '@angular/cdk/a11y';
import {AutoCompleteService} from './services/auto-complete.service';
import { AutoCompleteOptionComponent } from './auto-complete-option/auto-complete-option.component';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    A11yModule
  ],
  declarations: [
    AutoCompleteComponent,
    AutoCompleteListsComponent,
    AutoCompleteDirective,
    AutoCompleteInputDirective,
    AutoCompleteItemDirective,
    AutoCompleteOptionComponent],
  exports: [
    AutoCompleteComponent,
    AutoCompleteListsComponent,
    AutoCompleteDirective,
    AutoCompleteInputDirective,
    AutoCompleteItemDirective,
    AutoCompleteOptionComponent,
  ],
  providers: [AutoCompleteService]
})
export class AutoCompleteModule {
}
