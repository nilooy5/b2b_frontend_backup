import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderHireJobDetailsComponent } from './tender-hire-job-details.component';

describe('TenderHireJobDetailsComponent', () => {
  let component: TenderHireJobDetailsComponent;
  let fixture: ComponentFixture<TenderHireJobDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderHireJobDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderHireJobDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
