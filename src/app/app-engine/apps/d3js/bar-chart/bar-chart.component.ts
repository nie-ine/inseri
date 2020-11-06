import {Component, OnInit, ViewEncapsulation, Input, AfterViewChecked} from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import { Options } from '@angular-slider/ngx-slider';

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
  private margin = {top: 20, right: 20, bottom: 30, left: 50};

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

  chartWidth: any = 350;
  newChartWidth = 0;
  isSorted = false;

  showRange = false;
  rangeLabel: string;

  RangeOptions: Options = {
    floor: 0,
    ceil: 0
  };

  rangeMinMin: any;
  rangeMinMax: any;
  rangeLowest: any;
  newRangeLowest: any;

  rangeMaxMax: any;
  rangeMaxMin: any;
  rangeHighest: any;
  newRangeHighest: any;

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
    d3.select('#barChartChart_' + this.numberOfInitialisedComponent).select('svg').remove();
    d3.select('#barChartYaxis_' + this.numberOfInitialisedComponent).select('svg').remove();
    this.initSvg();
    this.initAxis();
    this.drawAxis();
    this.drawBars();
  }

  private initSvg() {
    if (this.data.metadata.rangeLabel) {
      this.showRange = true;
      this.rangeLabel = this.data.metadata.rangeLabel;
    }
    if (this.newChartWidth !== 0) {
      this.chartWidth = this.newChartWidth;
    } else {
      if (this.data.data.length * 25 > this.chartWidth) {
        this.chartWidth = this.data.data.length * 25;
      } else {
        this.newChartWidth = this.chartWidth;
      }
    }
    this.svgChart = d3.select('#barChartChart_' + this.numberOfInitialisedComponent)
      .append('svg')
      .attr('width', this.chartWidth)
      .attr('height', 350);
    this.width = this.chartWidth - this.margin.left - this.margin.right;
    this.height = 350 - this.margin.top - this.margin.bottom;
    this.g = this.svgChart.append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    this.svgYaxis = d3.select('#barChartYaxis_' + this.numberOfInitialisedComponent)
      .append('svg')
      .attr('width', 70)
      .attr('height', 350);

    this.gYaxis = this.svgYaxis.append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  /**
   * Initialize the components for the axis.
   */
  private initAxis() {
    if (this.data.metadata.rangeLabel) {
      this.rangeMinMin = d3Array.min(this.data.data, (d) => d3Array.min(d.ranges, (r) => r.point));
      this.rangeMaxMax = d3Array.max(this.data.data, (d) => d3Array.max(d.ranges, (r) => r.point));
      this.rangeMinMax = this.rangeMaxMax;
      this.rangeMaxMin = this.rangeMinMax;
      if (this.newRangeLowest !== undefined) { // User indicated new lowest
        this.rangeLowest = this.newRangeLowest;
        this.rangeMaxMin = this.rangeLowest;
      } else {
        this.rangeLowest = d3Array.min(this.data.data, (d) => d3Array.min(d.ranges, (r) => r.point));
        this.newRangeLowest = this.rangeLowest;
      }
      if (this.newRangeHighest !== undefined) { // User indicated new highest
        this.rangeHighest = this.newRangeHighest;
        this.rangeMinMax = this.rangeHighest;
      } else {
        this.rangeHighest = d3Array.max(this.data.data, (d) => d3Array.max(d.ranges, (r) => r.point));
        this.newRangeHighest = this.rangeHighest;
      }
      const helpLow = this.rangeLowest;
      const helpHigh = this.rangeHighest;
      this.data.data.forEach( function (d) {
        d.value = 0;
        d.ranges.forEach( function (r) {
          if (r.point >= helpLow && r.point <= helpHigh) {
            d.value += r.value;
          }
        });
      });
      this.RangeOptions.floor = this.rangeLowest;
      this.RangeOptions.ceil = this.rangeHighest;
    }

    if (this.isSorted === true) {
      // Sort by value
      this.data.data.sort((a: any, b: any) => b.value - a.value);
    } else { // Sort by bar label
      this.data.data.sort( function (a: any, b: any) {
        if (a.label < b.label) { return -1; }
        if (a.label > b.label) { return 1; }
        return 0;
      });
    }

    this.x = d3Scale.scaleBand().range([0, this.chartWidth - this.margin.left - this.margin.right])
      .paddingInner(0.1)
      .paddingOuter(0.1)
      .align(0.5);
    this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);
    this.x.domain(this.data.data.map((d) => d.label));
    if (d3Array.max(this.data.data, (d) => d.value) !== 0) {
      this.y.domain([0, d3Array.max(this.data.data, (d) => d.value)]);
    }

    // Always sort back to initial state (by label)
    // this.data.data.sort((a: any, b: any) => a.label - b.label);
    this.data.data.sort( function (a: any, b: any) {
      if (a.label < b.label) { return -1; }
      if (a.label > b.label) { return 1; }
      return 0;
    });
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

    if (this.data.metadata.axes) {
      this.gYaxis.append('g')
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 0 - (this.margin.left + 3))
        .attr('x', 0 - (this.height / 2))
        .attr('dy', '1em')
        .attr('fill', 'black')
        .attr('font-weight', 'bold')
        .attr('text-anchor', 'middle')
        .text(this.data.metadata.axes.y);

      this.g.append('g')
        .append('text')
        // tslint:disable-next-line:max-line-length
        .attr('transform', 'translate(' + ((this.chartWidth - this.margin.left - this.margin.right) / 2) + ',' + (this.height + this.margin.top + 10) + ')')
        .attr('fill', 'black')
        .attr('font-weight', 'bold')
        .style('text-anchor', 'middle')
        .text(this.data.metadata.axes.x);
    }
  }


  /**
   * Draw a bar to every entry, the height representing the value.
   */
  private drawBars() {
    this.g.selectAll('.bar')
      .data(this.data.data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => this.x(d.label))
      .attr('y', (d) => this.y(d.value))
      .attr('width', this.x.bandwidth())
      .attr('height', (d) => this.height - this.y(d.value));

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
