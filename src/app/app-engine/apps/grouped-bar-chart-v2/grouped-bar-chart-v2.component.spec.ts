import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupedBarChartV2Component } from './grouped-bar-chart-v2.component';

describe('GroupedBarChartV2Component', () => {
  let component: GroupedBarChartV2Component;
  let fixture: ComponentFixture<GroupedBarChartV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupedBarChartV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupedBarChartV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
