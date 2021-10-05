import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderGeneralComponent } from './tender-general.component';

describe('TenderGeneralComponent', () => {
  let component: TenderGeneralComponent;
  let fixture: ComponentFixture<TenderGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
