import { TestBed, inject } from '@angular/core/testing';

import { StandoffReconcilerService } from './standoff-reconciler.service';

describe('StandoffReconcilerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StandoffReconcilerService]
    });
  });

  it('should be created', inject([StandoffReconcilerService], (service: StandoffReconcilerService) => {
    expect(service).toBeTruthy();
  }));
});
