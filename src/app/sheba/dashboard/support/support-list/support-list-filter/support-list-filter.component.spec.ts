import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportListFilterComponent } from './support-list-filter.component';

describe('SupportListFilterComponent', () => {
  let component: SupportListFilterComponent;
  let fixture: ComponentFixture<SupportListFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupportListFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
