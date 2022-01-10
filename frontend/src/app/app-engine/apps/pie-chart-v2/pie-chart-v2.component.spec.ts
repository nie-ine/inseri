import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PieChartV2Component } from './pie-chart-v2.component';

describe('PieChartV2Component', () => {
  let component: PieChartV2Component;
  let fixture: ComponentFixture<PieChartV2Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PieChartV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PieChartV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
