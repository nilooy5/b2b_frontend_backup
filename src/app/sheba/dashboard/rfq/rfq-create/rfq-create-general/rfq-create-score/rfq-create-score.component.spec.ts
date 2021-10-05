import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqCreateScoreComponent } from './rfq-create-score.component';

describe('RfqCreateScoreComponent', () => {
  let component: RfqCreateScoreComponent;
  let fixture: ComponentFixture<RfqCreateScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfqCreateScoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfqCreateScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
