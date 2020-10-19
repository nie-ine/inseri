import { TestBed, inject } from '@angular/core/testing';

import { JoinedTextViewRequestService } from './joined-text-view-request.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('JoinedTextViewRequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JoinedTextViewRequestService],
      imports: [ HttpClientTestingModule ]
    });
  });

  it('should be created', inject([JoinedTextViewRequestService], (service: JoinedTextViewRequestService) => {
    expect(service).toBeTruthy();
  }));
});
