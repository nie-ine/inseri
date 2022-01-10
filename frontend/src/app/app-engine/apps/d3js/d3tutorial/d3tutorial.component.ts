import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import * as d3 from 'd3-selection';

/**
 * This component shows how to write a d3 visualization in an angular component.
 */
@Component({
  selector: 'app-d3tutorial',
  templateUrl: './d3tutorial.component.html',
  styleUrls: ['./d3tutorial.component.scss']
})
export class D3tutorialComponent implements OnInit{
  @ViewChild('editor', { static: true }) editor;
  private canvas: any;
  private circle: any;
  private rectangle: any;
  firstStep = 'this.svg = d3.select(\'svg\');';
  constructor() { }

  ngOnInit() {
    this.canvas = d3.select('svg')
      .attr('width', 700)
      .attr('height', 700);
    this.circle = this.canvas.append('circle')
      .attr('cx', 50)
      .attr('cy', 50)
      .attr('r', 50)
      .attr('fill', 'blue');
    this.rectangle = this.canvas.append('rect')
      .attr('width', 100)
      .attr('height', 100);
  }

}
