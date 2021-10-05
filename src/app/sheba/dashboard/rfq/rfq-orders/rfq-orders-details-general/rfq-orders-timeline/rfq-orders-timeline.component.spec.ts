import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqOrdersTimelineComponent } from './rfq-orders-timeline.component';

describe('RfqOrdersTimelineComponent', () => {
  let component: RfqOrdersTimelineComponent;
  let fixture: ComponentFixture<RfqOrdersTimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfqOrdersTimelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfqOrdersTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
