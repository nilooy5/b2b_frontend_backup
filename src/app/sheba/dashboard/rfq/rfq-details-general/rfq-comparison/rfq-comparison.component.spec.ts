import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqComparisonComponent } from './rfq-comparison.component';

describe('RfqComparisonComponent', () => {
  let component: RfqComparisonComponent;
  let fixture: ComponentFixture<RfqComparisonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfqComparisonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfqComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
