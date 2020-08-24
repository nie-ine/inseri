import {Component, OnInit, ViewEncapsulation, Input, AfterViewChecked} from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';

import { STATISTICS } from './statistics';

/**
 * This component describes a bar chart, with a column for each value from left to right.
 * The column's height represents the value behind.
 */
@Component({
  selector: 'app-bar-chart',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements AfterViewChecked {

  /**
   * needed for NIE-OS
   */
  @Input() initialised = false;

  /**
   * needed for NIE-OS
   */
  @Input() numberOfInitialisedComponent: number;

  @Input() data: any;

  /**
   * Title of the component
   */
  title = 'Bar Chart';

  /**
   * Width of the component in pixels.
   */
  private width: number;

  /**
   * Height of the component in pixels.
   */
  private height: number;

  /**
   * Margin around the SVG image.
   */
  private margin = {top: 20, right: 20, bottom: 30, left: 40};

  /**
   * Horizontal axis scale.
   */
  private x: any;

  /**
   * Vertical axis scale.
   */
  private y: any;

  /**
   * Root element of the SVG image.
   */
  private svgChart: any;
  private svgYaxis: any;

  /**
   * Group for the axis labels.
   */
  private g: any;
  private gYaxis: any;

  /**
   * needed by NIE-OS
   */
  alreadyInitialised = false;

  imageWidth = 600;

  private posX: number;
  private posY: number;
  /**
   * written by angular-cli
   */
  constructor() {}


  /**
   * After initializing the component, initialize the SVG image.
   */
  ngAfterViewChecked() {
    if ( this.initialised && !this.alreadyInitialised && this.data ) {
      // console.log( this.data );
      if ( typeof this.data === 'string' && IsJsonString(this.data) && JSON.parse(this.data).length > 0 ) {
        const help = this.data;
        this.data = {};
        this.data.data = JSON.parse(help);
        this.alreadyInitialised = true;
        setTimeout(() => {
          this.drawBarChart();
        }, 100);
      } else if ( typeof this.data !== 'string' ) {
        this.alreadyInitialised = true;
        setTimeout(() => {
          this.drawBarChart();
        }, 100);
      }
    }
  }

  drawBarChart() {
    // this.g = undefined;
    // this.svgChart = undefined;
    this.initSvg();
    this.initAxis();
    this.drawAxis();
    this.drawBars();
  }

  // generateComponentDivClass() {
  //   return 'barChart' + this.numberOfInitialisedComponent;
  // }

  private initSvg() {
    if (this.data.data.length * 50 > this.imageWidth) {
      this.imageWidth = this.data.data.length * 50;
    }
    this.svgChart = d3.select('#barChartChart_' + this.numberOfInitialisedComponent)
      .append('svg')
      .attr('width', this.imageWidth)
      // .attr('width', this.imageWidth) // Change here for size of the bars
      .attr('height', 350);
    this.width = this.imageWidth - this.margin.left - this.margin.right;
    this.height = 350 - this.margin.top - this.margin.bottom;
    this.g = this.svgChart.append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    this.svgYaxis = d3.select('#barChartYaxis_' + this.numberOfInitialisedComponent)
      .append('svg')
      .attr('width', 50)
      .attr('height', 350);

    this.gYaxis = this.svgYaxis.append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  /**
   * Initialize the components for the axis.
   */
  private initAxis() {
    this.x = d3Scale.scaleBand().range([0, this.imageWidth - this.margin.left - this.margin.right])
      .paddingInner(0.1)
      .paddingOuter(0.1)
      .align(0.0);
    this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);
    this.x.domain(this.data.data.map((d) => d.label));
    this.y.domain([0, d3Array.max(this.data.data, (d) => d.value)]);
  }

  /**
   * Add the label of every entry to the axis.
   */
  private drawAxis() {
    this.g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3Axis.axisBottom(this.x));

    this.gYaxis.append('g')
      .attr('class', 'axis axis--y')
      .call(d3Axis.axisLeft(this.y).ticks(10));
      // .append('text')
      // .attr('class', 'axis-title')
      // .attr('transform', 'rotate(-90)')
      // .attr('y', 6)
      // .attr('dy', '0.71em')
      // .attr('text-anchor', 'end')
      // .text('value');
  }

  /**
   * Draw a bar to every entry, the height representing the value.
   */
  private drawBars() {
    this.g.selectAll('.bar')
      .data(this.data.data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => this.x(d.label) )
      .attr('y', (d) => this.y(d.value) )
      .attr('width', this.x.bandwidth())
      .attr('height', (d) => this.height - this.y(d.value) );

    // define tooltip
    const tooltip = d3.select('#barChartChart_' + this.numberOfInitialisedComponent)
      .append('div')
      .attr('class', 'barChartTooltip')
      .attr('id', 'barChartTooltip_' + this.numberOfInitialisedComponent);

    tooltip.append('div')
      .attr('class', 'barChartTooltipValue')
      .attr('id', 'barChartTooltipValue_' + this.numberOfInitialisedComponent);

    const bar = this.svgChart.selectAll('.bar');

    bar.on('mouseover', (d) => {
      tooltip.select('#barChartTooltipValue_' + this.numberOfInitialisedComponent).html(d.value);
      tooltip.style('display', 'block');

      onmousemove = (e) => {
        this.posX = e.clientX + 20;
        this.posY = e.clientY - 20;
        tooltip
          .style('left', (this.posX) + 'px')
          .style('top', (this.posY) + 'px');
      };

      onmouseout = (e) => {
        tooltip.style('display', 'none');
      };
    });


  }

}

function IsJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
