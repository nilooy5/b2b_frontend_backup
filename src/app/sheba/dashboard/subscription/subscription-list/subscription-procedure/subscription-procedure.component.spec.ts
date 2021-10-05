import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionProcedureComponent } from './subscription-procedure.component';

describe('SubscriptionProcedureComponent', () => {
  let component: SubscriptionProcedureComponent;
  let fixture: ComponentFixture<SubscriptionProcedureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionProcedureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionProcedureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
