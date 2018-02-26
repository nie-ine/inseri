import { TestBed, inject } from '@angular/core/testing';

import { RegionToSvgService } from './region-to-svg.service';

describe('RegionToSvgService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegionToSvgService]
    });
  });

  it('should be created', inject([RegionToSvgService], (service: RegionToSvgService) => {
    expect(service).toBeTruthy();
  }));

  it('should create circles', inject([RegionToSvgService], (service: RegionToSvgService) => {
    const region = {
      'status': 'active',
      'lineColor': '#3333ff',
      'lineWidth': 2,
      'points': [
        {'x': 0.3400735294117647, 'y': 0.45376078914919854}
      ],
      'type': 'circle',
      'radius': {'x': 0.04595588235294118, 'y': 0.03082614056720101},
      'original_index': 1
    };

    const circle = RegionToSvgService.createSvgElement(region, 200);
    expect(circle.tagName).toBe('circle');
  }));

  it('should create rectangles', inject([RegionToSvgService], (service: RegionToSvgService) => {
    const region = {
      'status': 'active',
      'lineColor': '#ff3333',
      'lineWidth': 2,
      'points': [
        {'x': 0.18505338078291814, 'y': 0.16203703703703703},
        {'x': 0.8185053380782918, 'y': 0.7199074074074074}
      ],
      'type': 'rectangle'
    };

    const rect = RegionToSvgService.createSvgElement(region, 200);
    expect(rect.tagName).toBe('rect');
  }));

  it('should create polygons', inject([RegionToSvgService], (service: RegionToSvgService) => {
    const region = {
        'status': 'active',
        'lineColor': '#ff3333',
        'lineWidth': 2,
        'points': [
          {'x': 0.10596026490066225, 'y': 0.2199074074074074},
          {'x': 0.6390728476821192, 'y': 0.2175925925925926},
          {'x': 0.6390728476821192, 'y': 0.7314814814814815},
          {'x': 0.10264900662251655, 'y': 0.7337962962962963},
          {'x': 0.10927152317880795, 'y': 0.2199074074074074}
        ],
        'type': 'polygon'
      };
    const poly = RegionToSvgService.createSvgElement(region, 200);
    expect(poly.tagName).toBe('polygon');
  }));
});
