import { TestBed } from '@angular/core/testing';

import { JoinedTextViewKnoraRequestService } from './joined-text-view-knora-request.service';

describe('JoinedTextViewKnoraRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JoinedTextViewKnoraRequestService = TestBed.get(JoinedTextViewKnoraRequestService);
    expect(service).toBeTruthy();
  });
});
