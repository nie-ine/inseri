import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { RouterModule } from "@angular/router";
import { D3tutorialComponent } from './d3tutorial/d3tutorial.component';
import { AceEditorModule } from 'ng2-ace-editor';
import { MultiLineChartComponent } from './multi-line-chart/multi-line-chart.component';
import { BrushAndZoomComponent } from './brush-and-zoom/brush-and-zoom.component';
import { RadialBarchartComponent } from './radial-barchart/radial-barchart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { StackedBarChartComponent } from './stacked-bar-chart/stacked-bar-chart.component';
import { SankeyComponent } from './sankey/sankey.component';
import { LeafletExampleComponent } from './leaflet-example/leaflet-example.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

@NgModule({
  imports: [
    CommonModule,
    LeafletModule,
    RouterModule.forChild([
      { path: 'bar-chart', component: BarChartComponent },
      { path: 'd3-tutorial', component: D3tutorialComponent },
      { path: 'multi-line-chart', component: MultiLineChartComponent },
      { path: 'brush-zoom', component: BrushAndZoomComponent },
      { path: 'radial-component', component: RadialBarchartComponent },
      { path: 'pie-chart', component: PieChartComponent },
      { path: 'stacked-bar-chart', component: StackedBarChartComponent },
      { path: 'sankey', component: SankeyComponent },
      { path: 'leaflet-example', component: LeafletExampleComponent }
    ]),
    AceEditorModule
  ],
  declarations: [
    BarChartComponent,
    D3tutorialComponent,
    MultiLineChartComponent,
    BrushAndZoomComponent,
    RadialBarchartComponent,
    PieChartComponent,
    StackedBarChartComponent,
    SankeyComponent,
    LeafletExampleComponent
  ],
  exports: [
    BarChartComponent,
    D3tutorialComponent,
    MultiLineChartComponent,
    BrushAndZoomComponent,
    RadialBarchartComponent,
    PieChartComponent,
    StackedBarChartComponent,
    LeafletExampleComponent,
    SankeyComponent
]
})
export class D3jsModule { }
