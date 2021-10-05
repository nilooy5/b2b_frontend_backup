import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DigigoHeroSectionComponent } from './digigo-hero-section.component';

describe('DigigoHeroSectionComponent', () => {
  let component: DigigoHeroSectionComponent;
  let fixture: ComponentFixture<DigigoHeroSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DigigoHeroSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DigigoHeroSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
