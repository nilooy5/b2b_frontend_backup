import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileViewModalComponent } from './mobile-view-modal.component';

describe('MobileViewModalComponent', () => {
  let component: MobileViewModalComponent;
  let fixture: ComponentFixture<MobileViewModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileViewModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
