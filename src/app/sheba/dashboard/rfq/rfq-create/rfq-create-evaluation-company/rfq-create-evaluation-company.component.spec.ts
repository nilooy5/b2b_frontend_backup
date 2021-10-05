import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqCreateEvaluationCompanyComponent } from './rfq-create-evaluation-company.component';

describe('RfqCreateEvaluationCompanyComponent', () => {
  let component: RfqCreateEvaluationCompanyComponent;
  let fixture: ComponentFixture<RfqCreateEvaluationCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfqCreateEvaluationCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfqCreateEvaluationCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
