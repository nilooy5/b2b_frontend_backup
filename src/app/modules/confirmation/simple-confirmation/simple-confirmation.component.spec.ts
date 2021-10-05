import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleConfirmationComponent } from './simple-confirmation.component';

describe('SimpleConfirmationComponent', () => {
  let component: SimpleConfirmationComponent;
  let fixture: ComponentFixture<SimpleConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
