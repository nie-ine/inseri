import { TestBed, inject } from '@angular/core/testing';

import { KnoraRequestService } from './knora-request.service';
import { KnoraAuthService } from './knora-auth.service';

class knoraAuthServiceStub {}

describe('KnoraRequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
		providers: [
			KnoraRequestService,
			{ provide: KnoraAuthService, useValue: knoraAuthServiceStub }
		]
    });
  });

  it('should be created', inject([KnoraRequestService], (service: KnoraRequestService) => {
    expect(service).toBeTruthy();
  }));
});
