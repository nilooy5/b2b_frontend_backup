import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondaryCategoryShowcaseCardComponent } from './secondary-category-showcase-card.component';

describe('SecondaryCategoryShowcaseCardComponent', () => {
  let component: SecondaryCategoryShowcaseCardComponent;
  let fixture: ComponentFixture<SecondaryCategoryShowcaseCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondaryCategoryShowcaseCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondaryCategoryShowcaseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
