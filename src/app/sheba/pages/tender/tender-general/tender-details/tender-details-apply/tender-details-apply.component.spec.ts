import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderDetailsApplyComponent } from './tender-details-apply.component';

describe('TenderDetailsApplyComponent', () => {
  let component: TenderDetailsApplyComponent;
  let fixture: ComponentFixture<TenderDetailsApplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderDetailsApplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderDetailsApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
