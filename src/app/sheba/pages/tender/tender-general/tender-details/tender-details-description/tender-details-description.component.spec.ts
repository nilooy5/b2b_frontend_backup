import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderDetailsDescriptionComponent } from './tender-details-description.component';

describe('TenderDetailsDescriptionComponent', () => {
  let component: TenderDetailsDescriptionComponent;
  let fixture: ComponentFixture<TenderDetailsDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderDetailsDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderDetailsDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
