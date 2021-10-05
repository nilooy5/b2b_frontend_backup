import {
  AfterContentInit,
  Directive,
  ElementRef, HostBinding, Input,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import {AutoCompleteService} from '../services/auto-complete.service';
import {OverlayRef} from '@angular/cdk/overlay';

@Directive({
  selector: '[appAutoComplete]',
  exportAs: 'appAutoComplete',
})
export class AutoCompleteDirective implements OnInit, AfterContentInit {
  @HostBinding('tabindex') tabIndex = 1;
  overlayRef: OverlayRef;
  @Input() appAutoComplete;

  constructor(
    public templateRef: TemplateRef<any>,
    public vcr: ViewContainerRef,
    private service: AutoCompleteService,
  ) {
  }

  show(el: ElementRef) {
    this.service.open(this.templateRef, this.vcr, el);
  }

  ngOnInit(): void {

  }


  detach() {
    this.service.detach();
  }

  ngAfterContentInit(): void {

  }
}
