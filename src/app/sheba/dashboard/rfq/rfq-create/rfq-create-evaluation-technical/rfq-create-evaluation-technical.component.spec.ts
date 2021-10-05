import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqCreateEvaluationTechnicalComponent } from './rfq-create-evaluation-technical.component';

describe('RfqCreateEvaluationTechnicalComponent', () => {
  let component: RfqCreateEvaluationTechnicalComponent;
  let fixture: ComponentFixture<RfqCreateEvaluationTechnicalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfqCreateEvaluationTechnicalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfqCreateEvaluationTechnicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
