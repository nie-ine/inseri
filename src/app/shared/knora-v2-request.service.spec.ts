import { TestBed, inject } from '@angular/core/testing';

import { KnoraV2RequestService } from './knora-v2-request.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('KnoraV2RequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KnoraV2RequestService],
      imports: [ HttpClientTestingModule ]
    });
  });

  it('should be created', inject([KnoraV2RequestService], (service: KnoraV2RequestService) => {
    expect(service).toBeTruthy();
  }));
});
