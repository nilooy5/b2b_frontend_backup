import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementTenderDetailMessagingComponent } from './procurement-tender-detail-messaging.component';

describe('ProcurementTenderDetailMessagingComponent', () => {
  let component: ProcurementTenderDetailMessagingComponent;
  let fixture: ComponentFixture<ProcurementTenderDetailMessagingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcurementTenderDetailMessagingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcurementTenderDetailMessagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
