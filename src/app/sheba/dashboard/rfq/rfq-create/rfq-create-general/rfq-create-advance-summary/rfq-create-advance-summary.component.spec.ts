import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqCreateAdvanceSummaryComponent } from './rfq-create-advance-summary.component';

describe('RfqCreateAdvanceSummaryComponent', () => {
  let component: RfqCreateAdvanceSummaryComponent;
  let fixture: ComponentFixture<RfqCreateAdvanceSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfqCreateAdvanceSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfqCreateAdvanceSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
