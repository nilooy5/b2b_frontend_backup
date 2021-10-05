import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderParticipateComponent } from './tender-participate.component';

describe('TenderParticipateComponent', () => {
  let component: TenderParticipateComponent;
  let fixture: ComponentFixture<TenderParticipateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderParticipateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderParticipateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
