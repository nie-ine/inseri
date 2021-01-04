import { TestBed, inject } from '@angular/core/testing';

import { DragService } from './drag.service';

describe('DragService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DragService]
    });
  });

  it('should be created', inject([DragService], (service: DragService) => {
    expect(service).toBeTruthy();
  }));
});
