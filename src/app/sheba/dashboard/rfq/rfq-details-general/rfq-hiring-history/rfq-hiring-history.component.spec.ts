import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqHiringHistoryComponent } from './rfq-hiring-history.component';

describe('RfqHiringHistoryComponent', () => {
  let component: RfqHiringHistoryComponent;
  let fixture: ComponentFixture<RfqHiringHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfqHiringHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfqHiringHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
