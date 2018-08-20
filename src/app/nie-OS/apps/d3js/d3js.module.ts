import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { RouterModule } from "@angular/router";
import { D3tutorialComponent } from './d3tutorial/d3tutorial.component';
import { AceEditorModule } from 'ng2-ace-editor';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'bar-chart', component: BarChartComponent },
      { path: 'd3-tutorial', component: D3tutorialComponent }
    ]),
    AceEditorModule
  ],
  declarations: [
    BarChartComponent,
    D3tutorialComponent
  ],
  exports: [
    BarChartComponent,
    D3tutorialComponent
]
})
export class D3jsModule { }
