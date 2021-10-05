import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderLandingBusinessComponent } from './tender-landing-business.component';

describe('TenderLandingBusinessComponent', () => {
  let component: TenderLandingBusinessComponent;
  let fixture: ComponentFixture<TenderLandingBusinessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderLandingBusinessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderLandingBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
