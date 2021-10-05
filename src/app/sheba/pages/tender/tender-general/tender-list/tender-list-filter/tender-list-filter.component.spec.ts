import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderListFilterComponent } from './tender-list-filter.component';

describe('TenderListFilterComponent', () => {
  let component: TenderListFilterComponent;
  let fixture: ComponentFixture<TenderListFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderListFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
