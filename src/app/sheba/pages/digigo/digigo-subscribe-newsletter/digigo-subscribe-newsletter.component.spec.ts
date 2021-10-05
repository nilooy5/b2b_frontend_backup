import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DigigoSubscribeNewsletterComponent } from './digigo-subscribe-newsletter.component';

describe('DigigoSubscribeNewsletterComponent', () => {
  let component: DigigoSubscribeNewsletterComponent;
  let fixture: ComponentFixture<DigigoSubscribeNewsletterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DigigoSubscribeNewsletterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DigigoSubscribeNewsletterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
