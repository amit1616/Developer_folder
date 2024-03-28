import { TestBed } from '@angular/core/testing';

import { ContractDetailsService } from './contract-details.service';

describe('ContractDetailsService', () => {
  let service: ContractDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContractDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
