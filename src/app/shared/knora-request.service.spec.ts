import { TestBed, inject } from '@angular/core/testing';

import { KnoraRequestService } from './knora-request.service';

describe('KnoraRequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KnoraRequestService]
    });
  });

  it('should be created', inject([KnoraRequestService], (service: KnoraRequestService) => {
    expect(service).toBeTruthy();
  }));
});
