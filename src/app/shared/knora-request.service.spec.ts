import { TestBed, inject } from '@angular/core/testing';

import { KnoraRequestService } from './knora-request.service';
import {KnoraAuthService} from './knora-auth.service';

describe('KnoraRequestService', () => {
  const knoraAuthServiceStub = {};
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KnoraRequestService, {provide: KnoraAuthService, useValue: knoraAuthServiceStub}]
    });
  });

  it('should be created', inject([KnoraRequestService], (service: KnoraRequestService) => {
    expect(service).toBeTruthy();
  }));
});
