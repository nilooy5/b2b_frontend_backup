import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderHireTermsComponent } from './tender-hire-terms.component';

describe('TenderHireTermsComponent', () => {
  let component: TenderHireTermsComponent;
  let fixture: ComponentFixture<TenderHireTermsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderHireTermsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderHireTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
