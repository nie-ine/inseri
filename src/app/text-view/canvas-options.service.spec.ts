import { TestBed, inject } from '@angular/core/testing';

import { CanvasOptionsService } from './canvas-options.service';

describe('CanvasOptionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanvasOptionsService]
    });
  });

  it('should be created', inject([CanvasOptionsService], (service: CanvasOptionsService) => {
    expect(service).toBeTruthy();
  }));
});
