import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFormSectionComponent } from './home-form-section.component';

describe('HomeFormSectionComponent', () => {
  let component: HomeFormSectionComponent;
  let fixture: ComponentFixture<HomeFormSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeFormSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeFormSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
