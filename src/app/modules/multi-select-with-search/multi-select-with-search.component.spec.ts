import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiSelectWithSearchComponent } from './multi-select-with-search.component';

describe('MultiSelectWithSearchComponent', () => {
  let component: MultiSelectWithSearchComponent;
  let fixture: ComponentFixture<MultiSelectWithSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiSelectWithSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiSelectWithSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
