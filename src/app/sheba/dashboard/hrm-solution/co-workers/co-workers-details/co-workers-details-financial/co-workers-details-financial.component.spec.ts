import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoWorkersDetailsFinancialComponent } from './co-workers-details-financial.component';

describe('CoWorkersDetailsFinancialComponent', () => {
  let component: CoWorkersDetailsFinancialComponent;
  let fixture: ComponentFixture<CoWorkersDetailsFinancialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoWorkersDetailsFinancialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoWorkersDetailsFinancialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
