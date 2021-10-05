import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricePlanSectionComponent } from './price-plan-section.component';

describe('PricePlanSectionComponent', () => {
  let component: PricePlanSectionComponent;
  let fixture: ComponentFixture<PricePlanSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricePlanSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricePlanSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
