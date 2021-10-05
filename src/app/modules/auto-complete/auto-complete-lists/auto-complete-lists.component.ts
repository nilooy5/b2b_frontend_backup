import {AfterContentInit, Component, ContentChildren, ElementRef, HostBinding, Input, OnInit, QueryList} from '@angular/core';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';
import {AutoCompleteItemDirective} from '../directives/auto-complete-item.directive';
import {AutoCompleteService} from '../services/auto-complete.service';

@Component({
  selector: 'app-auto-complete-lists',
  templateUrl: './auto-complete-lists.component.html',
  styleUrls: ['./auto-complete-lists.component.scss']
})
export class AutoCompleteListsComponent implements OnInit, AfterContentInit {
  @HostBinding('style') style: SafeStyle;
  @HostBinding('class.auto-complete-lists') lists = true;
  @Input() inputElement: ElementRef;
  @Input() styles: string;
  @ContentChildren(AutoCompleteItemDirective) items: QueryList<AutoCompleteItemDirective>;

  constructor(
    private sanitizer: DomSanitizer,
    private service: AutoCompleteService
  ) {
  }

  ngOnInit() {
    this.style = this.sanitizer.bypassSecurityTrustStyle(this.styles ? this.styles : '');
  }

  ngAfterContentInit(): void {
    this.service.Items = this.items;
    this.items.changes.subscribe(res => {
      this.service.Items = res;
    });
  }
}
