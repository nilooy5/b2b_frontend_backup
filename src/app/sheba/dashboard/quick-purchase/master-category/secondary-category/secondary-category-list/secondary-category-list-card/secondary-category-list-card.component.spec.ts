import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondaryCategoryListCardComponent } from './secondary-category-list-card.component';

describe('SecondaryCategoryListCardComponent', () => {
  let component: SecondaryCategoryListCardComponent;
  let fixture: ComponentFixture<SecondaryCategoryListCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondaryCategoryListCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondaryCategoryListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
