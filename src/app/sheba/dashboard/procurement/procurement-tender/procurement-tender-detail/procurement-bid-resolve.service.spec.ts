import { TestBed } from '@angular/core/testing';

import { ProcurementBidResolveService } from './procurement-bid-resolve.service';

describe('ProcurementBidResolveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProcurementBidResolveService = TestBed.get(ProcurementBidResolveService);
    expect(service).toBeTruthy();
  });
});
