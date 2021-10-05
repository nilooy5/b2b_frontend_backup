import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqHireComponent } from './rfq-hire.component';

describe('RfqHireComponent', () => {
  let component: RfqHireComponent;
  let fixture: ComponentFixture<RfqHireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfqHireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfqHireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
