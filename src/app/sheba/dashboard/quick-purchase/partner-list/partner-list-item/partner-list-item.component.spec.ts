import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerListItemComponent } from './partner-list-item.component';

describe('PartnerListItemComponent', () => {
  let component: PartnerListItemComponent;
  let fixture: ComponentFixture<PartnerListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
