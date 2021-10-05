import {ElementRef, Inject, Injectable, QueryList, TemplateRef, ViewContainerRef} from '@angular/core';
import {Overlay, OverlayConfig, OverlayRef} from '@angular/cdk/overlay';
import {TemplatePortal} from '@angular/cdk/portal';
import {AutoCompleteItemDirective} from '../directives/auto-complete-item.directive';
import { Observable, of, Subject, Subscription} from 'rxjs';

@Injectable()
export class AutoCompleteService {
  portal: TemplatePortal;
  overlayRef: OverlayRef;
  positionStrategy: OverlayConfig;
  items: QueryList<AutoCompleteItemDirective>;
  subjectItems: Subject<QueryList<AutoCompleteItemDirective>> = new Subject();
  sub: Subscription[] = [];

  constructor(public overlay: Overlay) {
  }

  private create(template: TemplateRef<any>, vcr: ViewContainerRef) {
    this.overlayRef = this.overlay.create(this.positionStrategy);
    this.portal = new TemplatePortal(template, vcr);
    this.overlayRef.attach(this.portal);
  }

  open(template: TemplateRef<any>, vcr: ViewContainerRef, el: ElementRef) {
    this.positionStrategy = {
      positionStrategy: this.overlay.position().connectedTo(el, {
          originX: 'start',
          originY: 'bottom'
        },
        {
          overlayX: 'start',
          overlayY: 'top'
        }
      ),
      scrollStrategy: this.overlay.scrollStrategies.reposition({scrollThrottle: 1000, autoClose: false}),
      minWidth: el.nativeElement.clientWidth
    };
    this.create(template, vcr);
    // this.sub.push(this.elementObserver(el).subscribe(res => {
    //   console.log(res);
    // }));

  }

  detach() {
    this.overlayRef.detach();
    this.overlayRef.dispose();
    // this.sub.pop().unsubscribe();
  }

  get Items(): QueryList<AutoCompleteItemDirective> {
    return this.items;
  }

  set Items(items: QueryList<AutoCompleteItemDirective>) {
    this.subjectItems.next(items);
    this.items = items;
  }

  itemObserver(): Observable<QueryList<AutoCompleteItemDirective>> {
    return this.subjectItems.asObservable();
  }

  elementObserver(el: ElementRef) {
    return Observable.create(observer => {
      setInterval(() => {
        const rect = el.nativeElement.getBoundingClientRect();
        // const windowScroll = this.window.screenTop;
        // const windowHeight = this.window.innerHeight;
        observer.next({
          rect: rect,
          // windowScroll: windowScroll,
          // windowsHeight: windowHeight,
        });
      }, 1000);
    });
  }

}
