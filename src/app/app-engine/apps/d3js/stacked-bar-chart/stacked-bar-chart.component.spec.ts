import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StackedBarChartComponent } from './stacked-bar-chart.component';

describe('StackedBarChartComponent', () => {
  let component: StackedBarChartComponent;
  let fixture: ComponentFixture<StackedBarChartComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StackedBarChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StackedBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
