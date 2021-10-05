import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterCategoryFilterComponent } from './master-category-filter.component';

describe('MasterCategoryFilterComponent', () => {
  let component: MasterCategoryFilterComponent;
  let fixture: ComponentFixture<MasterCategoryFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterCategoryFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterCategoryFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
