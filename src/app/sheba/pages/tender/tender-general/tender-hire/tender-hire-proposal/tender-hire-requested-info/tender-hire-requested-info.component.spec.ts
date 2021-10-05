import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderHireRequestedInfoComponent } from './tender-hire-requested-info.component';

describe('TenderHireRequestedInfoComponent', () => {
  let component: TenderHireRequestedInfoComponent;
  let fixture: ComponentFixture<TenderHireRequestedInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderHireRequestedInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderHireRequestedInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
