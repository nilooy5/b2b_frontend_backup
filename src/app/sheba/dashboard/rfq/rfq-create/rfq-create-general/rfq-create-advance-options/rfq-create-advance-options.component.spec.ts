import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqCreateAdvanceOptionsComponent } from './rfq-create-advance-options.component';

describe('RfqCreateAdvanceOptionsComponent', () => {
  let component: RfqCreateAdvanceOptionsComponent;
  let fixture: ComponentFixture<RfqCreateAdvanceOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfqCreateAdvanceOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfqCreateAdvanceOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
