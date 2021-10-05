import { TestBed } from '@angular/core/testing';

import { ProcurementBidsService } from './procurement-bids.service';

describe('ProcurementBidsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProcurementBidsService = TestBed.get(ProcurementBidsService);
    expect(service).toBeTruthy();
  });
});
