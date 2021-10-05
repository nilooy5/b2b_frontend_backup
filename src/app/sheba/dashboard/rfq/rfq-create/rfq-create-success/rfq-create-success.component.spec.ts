import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqCreateSuccessComponent } from './rfq-create-success.component';

describe('RfqCreateSuccessComponent', () => {
  let component: RfqCreateSuccessComponent;
  let fixture: ComponentFixture<RfqCreateSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfqCreateSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfqCreateSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
