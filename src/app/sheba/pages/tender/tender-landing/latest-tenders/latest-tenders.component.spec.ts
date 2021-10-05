import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestTendersComponent } from './latest-tenders.component';

describe('LatestTendersComponent', () => {
  let component: LatestTendersComponent;
  let fixture: ComponentFixture<LatestTendersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LatestTendersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestTendersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
