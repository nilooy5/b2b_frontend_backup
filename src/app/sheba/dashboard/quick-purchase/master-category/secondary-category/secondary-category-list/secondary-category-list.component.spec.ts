import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondaryCategoryListComponent } from './secondary-category-list.component';

describe('SecondaryCategoryListComponent', () => {
  let component: SecondaryCategoryListComponent;
  let fixture: ComponentFixture<SecondaryCategoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondaryCategoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondaryCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
