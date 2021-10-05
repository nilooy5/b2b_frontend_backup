import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DigigoHowItWorksComponent } from './digigo-how-it-works.component';

describe('DigigoHowItWorksComponent', () => {
  let component: DigigoHowItWorksComponent;
  let fixture: ComponentFixture<DigigoHowItWorksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DigigoHowItWorksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DigigoHowItWorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
