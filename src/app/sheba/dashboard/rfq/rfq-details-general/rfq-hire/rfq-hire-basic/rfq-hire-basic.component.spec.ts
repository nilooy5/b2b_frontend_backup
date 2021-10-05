import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqHireBasicComponent } from './rfq-hire-basic.component';

describe('RfqHireBasicComponent', () => {
  let component: RfqHireBasicComponent;
  let fixture: ComponentFixture<RfqHireBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfqHireBasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfqHireBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
