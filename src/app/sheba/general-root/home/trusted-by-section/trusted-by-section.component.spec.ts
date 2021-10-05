import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrustedBySectionComponent } from './trusted-by-section.component';

describe('TrustedBySectionComponent', () => {
  let component: TrustedBySectionComponent;
  let fixture: ComponentFixture<TrustedBySectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrustedBySectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrustedBySectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
