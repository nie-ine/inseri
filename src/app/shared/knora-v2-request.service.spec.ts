import { TestBed, inject } from '@angular/core/testing';

import { KnoraV2RequestService } from './knora-v2-request.service';

describe('KnoraV2RequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KnoraV2RequestService]
    });
  });

  it('should be created', inject([KnoraV2RequestService], (service: KnoraV2RequestService) => {
    expect(service).toBeTruthy();
  }));
});
