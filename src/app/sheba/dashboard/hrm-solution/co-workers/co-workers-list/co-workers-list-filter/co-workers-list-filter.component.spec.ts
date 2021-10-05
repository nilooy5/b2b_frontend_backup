import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoWorkersListFilterComponent } from './co-workers-list-filter.component';

describe('CoWorkersListFilterComponent', () => {
  let component: CoWorkersListFilterComponent;
  let fixture: ComponentFixture<CoWorkersListFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoWorkersListFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoWorkersListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
