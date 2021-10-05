import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderHireComponent } from './tender-hire.component';

describe('TenderHireComponent', () => {
  let component: TenderHireComponent;
  let fixture: ComponentFixture<TenderHireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderHireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderHireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
