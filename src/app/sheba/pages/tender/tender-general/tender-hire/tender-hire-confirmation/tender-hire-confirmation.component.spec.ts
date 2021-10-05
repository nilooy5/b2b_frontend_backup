import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderHireConfirmationComponent } from './tender-hire-confirmation.component';

describe('TenderHireConfirmationComponent', () => {
  let component: TenderHireConfirmationComponent;
  let fixture: ComponentFixture<TenderHireConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderHireConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderHireConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
