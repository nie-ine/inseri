import { TestBed, inject } from '@angular/core/testing';

import { KnoraV2ViewerRequestService } from './knora-v2-viewer-request.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('KnoraV2ViewerRequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KnoraV2ViewerRequestService],
      imports: [ HttpClientTestingModule ]
    });
  });

  it('should be created', inject([KnoraV2ViewerRequestService], (service: KnoraV2ViewerRequestService) => {
    expect(service).toBeTruthy();
  }));
});
