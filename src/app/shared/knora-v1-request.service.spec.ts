import { TestBed, inject } from '@angular/core/testing';

import { KnoraV1RequestService } from './knora-v1-request.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('KnoraV1RequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KnoraV1RequestService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', inject([KnoraV1RequestService], (service: KnoraV1RequestService) => {
    expect(service).toBeTruthy();
  }));
});
