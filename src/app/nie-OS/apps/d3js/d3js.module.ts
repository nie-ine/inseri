import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'bar-chart', component: BarChartComponent }
    ])
  ],
  declarations: [
    BarChartComponent
  ],
  exports: [
    BarChartComponent
]
})
export class D3jsModule { }
