import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoWorkersAddFinancialComponent } from './co-workers-add-financial.component';

describe('CoWorkersAddFinancialComponent', () => {
  let component: CoWorkersAddFinancialComponent;
  let fixture: ComponentFixture<CoWorkersAddFinancialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoWorkersAddFinancialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoWorkersAddFinancialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
