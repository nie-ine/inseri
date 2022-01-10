import { TestBed, inject } from '@angular/core/testing';

import { GeneralRequestService } from './general-request.service';

describe('GeneralRequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeneralRequestService]
    });
  });

  it('should be created', inject([GeneralRequestService], (service: GeneralRequestService) => {
    expect(service).toBeTruthy();
  }));
});
