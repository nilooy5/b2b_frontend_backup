import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqComparisonEmptyComponent } from './rfq-comparison-empty.component';

describe('RfqComparisonEmptyComponent', () => {
  let component: RfqComparisonEmptyComponent;
  let fixture: ComponentFixture<RfqComparisonEmptyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfqComparisonEmptyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfqComparisonEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
