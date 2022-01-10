import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MultiLineChartComponent } from './multi-line-chart.component';

describe('MultiLineChartComponent', () => {
  let component: MultiLineChartComponent;
  let fixture: ComponentFixture<MultiLineChartComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiLineChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
