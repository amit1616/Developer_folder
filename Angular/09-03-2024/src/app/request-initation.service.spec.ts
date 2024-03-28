import { TestBed } from '@angular/core/testing';

import { RequestInitationService } from './request-initation.service';

describe('RequestInitationService', () => {
  let service: RequestInitationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestInitationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
