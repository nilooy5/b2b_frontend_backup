import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementOrdersTimelineTabComponent } from './procurement-orders-timeline-tab.component';

describe('ProcurementOrdersTimelineTabComponent', () => {
  let component: ProcurementOrdersTimelineTabComponent;
  let fixture: ComponentFixture<ProcurementOrdersTimelineTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcurementOrdersTimelineTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcurementOrdersTimelineTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
