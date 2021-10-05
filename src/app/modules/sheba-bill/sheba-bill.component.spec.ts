import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShebaBillComponent } from './sheba-bill.component';

describe('ShebaBillComponent', () => {
  let component: ShebaBillComponent;
  let fixture: ComponentFixture<ShebaBillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShebaBillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShebaBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
