import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqHireAdvanceComponent } from './rfq-hire-advance.component';

describe('RfqHireAdvanceComponent', () => {
  let component: RfqHireAdvanceComponent;
  let fixture: ComponentFixture<RfqHireAdvanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfqHireAdvanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfqHireAdvanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
