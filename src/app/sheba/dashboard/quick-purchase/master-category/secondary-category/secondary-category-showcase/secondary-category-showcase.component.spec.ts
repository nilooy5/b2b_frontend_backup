import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondaryCategoryShowcaseComponent } from './secondary-category-showcase.component';

describe('SecondaryCategoryShowcaseComponent', () => {
  let component: SecondaryCategoryShowcaseComponent;
  let fixture: ComponentFixture<SecondaryCategoryShowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondaryCategoryShowcaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondaryCategoryShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
