import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { RouterModule } from '@angular/router';
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
import { ChordDiagramComponent } from './chord-diagram/chord-diagram.component';
import { SpiralBarChartComponent } from './spiral-bar-chart/spiral-bar-chart.component';
import { FormsModule } from '@angular/forms';
import {NgxSliderModule} from '@angular-slider/ngx-slider';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSliderModule} from '@angular/material/slider';
import {MatInputModule} from '@angular/material/input';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@NgModule({
  imports: [
    CommonModule,
    LeafletModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSliderModule,
    MatInputModule,
    FormsModule,
    RouterModule.forChild([
      {path: 'bar-chart', component: BarChartComponent},
      {path: 'd3-tutorial', component: D3tutorialComponent},
      {path: 'multi-line-chart', component: MultiLineChartComponent},
      {path: 'brush-zoom', component: BrushAndZoomComponent},
      {path: 'radial-component', component: RadialBarchartComponent},
      {path: 'pie-chart', component: PieChartComponent},
      {path: 'stacked-bar-chart', component: StackedBarChartComponent},
      {path: 'sankey', component: SankeyComponent},
      {path: 'leaflet-example', component: LeafletExampleComponent},
      {path: 'chord', component: ChordDiagramComponent}
    ]),
    AceEditorModule,
    MatSlideToggleModule,
    NgxSliderModule,
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
    LeafletExampleComponent,
    ChordDiagramComponent,
    SpiralBarChartComponent
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
    SankeyComponent,
    ChordDiagramComponent,
    SpiralBarChartComponent,
    MatSlideToggleModule
]
})
export class D3jsModule { }
