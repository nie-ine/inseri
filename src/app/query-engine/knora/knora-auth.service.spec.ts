import { TestBed, inject } from '@angular/core/testing';

import { KnoraAuthService } from './knora-auth.service';

describe('KnoraAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KnoraAuthService]
    });
  });

  it('should be created', inject([KnoraAuthService], (service: KnoraAuthService) => {
    expect(service).toBeTruthy();
  }));
});
