import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribeNewsletterComponent } from './subscribe-newsletter.component';

describe('SubscribeNewsletterComponent', () => {
  let component: SubscribeNewsletterComponent;
  let fixture: ComponentFixture<SubscribeNewsletterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscribeNewsletterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribeNewsletterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
