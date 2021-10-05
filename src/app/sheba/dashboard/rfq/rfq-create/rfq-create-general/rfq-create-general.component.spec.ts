import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqCreateGeneralComponent } from './rfq-create-general.component';

describe('RfqCreateGeneralComponent', () => {
  let component: RfqCreateGeneralComponent;
  let fixture: ComponentFixture<RfqCreateGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfqCreateGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfqCreateGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
