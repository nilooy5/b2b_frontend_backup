import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqComparisonTableComponent } from './rfq-comparison-table.component';

describe('RfqComparisonTableComponent', () => {
  let component: RfqComparisonTableComponent;
  let fixture: ComponentFixture<RfqComparisonTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfqComparisonTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfqComparisonTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
