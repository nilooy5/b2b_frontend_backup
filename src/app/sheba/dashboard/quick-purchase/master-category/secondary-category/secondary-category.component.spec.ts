import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondaryCategoryComponent } from './secondary-category.component';

describe('SecondaryCategoryComponent', () => {
  let component: SecondaryCategoryComponent;
  let fixture: ComponentFixture<SecondaryCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondaryCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondaryCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
