import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletTransactionsFilterComponent } from './wallet-transactions-filter.component';

describe('WalletTransactionsFilterComponent', () => {
  let component: WalletTransactionsFilterComponent;
  let fixture: ComponentFixture<WalletTransactionsFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletTransactionsFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletTransactionsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
