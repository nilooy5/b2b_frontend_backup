import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqListFilterComponent } from './rfq-list-filter.component';

describe('RfqListFilterComponent', () => {
  let component: RfqListFilterComponent;
  let fixture: ComponentFixture<RfqListFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfqListFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfqListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
