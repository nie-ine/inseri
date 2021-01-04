import {Component, ViewEncapsulation, Input, AfterViewChecked} from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import { Options } from '@angular-slider/ngx-slider';

// The Bar Chart app renders a bar chart based on JSON data input
// See inseri/Tutorials/App descriptions for Researchers/Apps to visualise data/Bar Chart

@Component({
  selector: 'app-bar-chart',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements AfterViewChecked {
  // needed by inseri
  @Input() initialised = false;
  @Input() numberOfInitialisedComponent: number;
  @Input() data: any;

  alreadyInitialised = false;

  // Title of the component
  title = 'Bar Chart';

  // Width of the component in pixels
  private width: number;

  // Height of the component in pixels
  private height: number;

  // Margin around the SVG image
  private margin = {top: 20, right: 20, bottom: 30, left: 50};

  // Horizontal axis scale
  private x: any;

  // Vertical axis scale
  private y: any;

  // Root element of the SVG image
  private svgChart: any;
  private svgYaxis: any;

  // Group for the axis labels
  private g: any;
  private gYaxis: any;

  // Initial chart width (px)
  chartWidth: any = 350;
  // User provided chart width in the view
  newChartWidth = 0;

  // Bars sorted by value?
  isSorted = false;

  // Show the range slider?
  showRange = false;
  // The label above the range slider
  rangeLabel = 'Range';

  // Min/max value for the used ngx-slider as range slider
  // The values are set further down
  RangeOptions: Options = {
    floor: 0, // Min
    ceil: 0 // Max
  };

  // The current value of the left range slider handle
  rangeMinMin: any;
  // The currently possible maximal value of the left range slider handle
  // This value can never be higher than the value of the current right range slider handle
  rangeMinMax: any;
  // The absolute minimal value of the range slider
  rangeLowest: any;
  // User provided minimal range value
  newRangeLowest: any;

  // The current value of the right range slider handle
  rangeMaxMax: any;
  // The currently possible minimal value of the right range slider handel
  // This value can never be smaller than the value of the current left range slider handle
  rangeMaxMin: any;
  // The absolute maximal value of the range slider
  rangeHighest: any;
  // User provided maximal range value
  newRangeHighest: any;

  // Mouse x position for tooltip
  private posX: number;
  // Mouse y position for tooltip
  private posY: number;

  // The initial maximal value of a bar (before any possible change by the user through the range feature)
  initialMaxValue: number;

  constructor() {
  }

  // After initializing the component, initialize the SVG image
  ngAfterViewChecked() {
    if ( this.initialised && !this.alreadyInitialised && this.data ) {
      // Check if JSON input data is a string and therefore coming through the inseri microservice pipeline
      // If yes, parse string to JSON first, if no, use JSON input data as is
      if ( typeof this.data === 'string' && IsJsonString(this.data) && JSON.parse(this.data).length > 0 ) {
        const help = this.data;
        this.data = {};
        this.data.data = JSON.parse(help);
        this.initialMaxValue = d3Array.max(this.data.data, (d) => d.value);
        this.alreadyInitialised = true;
        setTimeout(() => {
          this.drawBarChart();
        }, 100);
      } else if ( typeof this.data !== 'string' ) {
        this.alreadyInitialised = true;
        this.initialMaxValue = d3Array.max(this.data.data, (d) => d.value);
        setTimeout(() => {
          this.drawBarChart();
        }, 100);
      }
    }
  }

  // Function to draw the chart
  drawBarChart() {
    // Remove any already existing chart elements (needed if chart is re-drawn)
    d3.select('#barChartChart_' + this.numberOfInitialisedComponent).select('svg').remove();
    d3.select('#barChartYaxis_' + this.numberOfInitialisedComponent).select('svg').remove();
    // Create the SVG
    this.initSvg();
    // Calculate the axes
    this.initAxis();
    // Draw the axes
    this.drawAxis();
    // Draw the bars
    this.drawBars();
  }

  private initSvg() {
    // Check if there are ranges given in the data
    if (this.data.data[0].range) {
      // Show the range feature
      this.showRange = true;
    }
    // Check if there's metadata in the JSON input data
    if (this.data.metadata) {
      // Check if there's a range label
      if (this.data.metadata.rangeLabel) {
        // Use the value of key "rangeLabel" to display it in the view
        this.rangeLabel = this.data.metadata.rangeLabel;
      }
    }
    // Check if the user indicated a new chart width
    if (this.newChartWidth !== 0) {
      // If yes, set the chart width to the newly indicated width
      this.chartWidth = this.newChartWidth;
    } else {
      // Check if the number of bars * 25 is higher than the initial chart width of 350 px
      if (this.data.data.length * 25 > this.chartWidth) {
        this.chartWidth = this.data.data.length * 25;
      } else {
        this.newChartWidth = this.chartWidth;
      }
    }
    // Create the SVG for the chart
    this.svgChart = d3.select('#barChartChart_' + this.numberOfInitialisedComponent)
      .append('svg')
      .attr('width', this.chartWidth)
      .attr('height', 350);
    this.width = this.chartWidth - this.margin.left - this.margin.right;
    this.height = 350 - this.margin.top - this.margin.bottom;
    this.g = this.svgChart.append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    // Create SVG container for the y-axis
    this.svgYaxis = d3.select('#barChartYaxis_' + this.numberOfInitialisedComponent)
      .append('svg')
      .attr('width', 70)
      .attr('height', 350);
    this.gYaxis = this.svgYaxis.append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  // Initialize the components for the axis.
  private initAxis() {
    // Check if the range feature if enabled
    if (this.showRange === true) {
      // Find the absolute minimal point in all the given ranges and use it as
      // the current value of the left range slider handle
      this.rangeMinMin = d3Array.min(this.data.data, (d) => d3Array.min(d.range, (r) => r.point));
      // Find the absolute highest point in all the given ranges and use it as
      // the current value of the right range slider handle
      this.rangeMaxMax = d3Array.max(this.data.data, (d) => d3Array.max(d.range, (r) => r.point));
      // The currently possible highest value for the left range slider handle is equal to the right range slider handle
      this.rangeMinMax = this.rangeMaxMax;
      // The currently possible lowest value for the right range slider handle is equal to the left range slider handle
      this.rangeMaxMin = this.rangeMinMax;
      // Check if the user indicated a new minimal point on the range
      if (this.newRangeLowest !== undefined) { // User indicated new lowest
        this.rangeLowest = this.newRangeLowest;
        this.rangeMaxMin = this.rangeLowest;
      } else {
        this.rangeLowest = d3Array.min(this.data.data, (d) => d3Array.min(d.range, (r) => r.point));
        this.newRangeLowest = this.rangeLowest;
      }
      // Check if the user indicated a new maximal point on the range
      if (this.newRangeHighest !== undefined) { // User indicated new highest
        this.rangeHighest = this.newRangeHighest;
        this.rangeMinMax = this.rangeHighest;
      } else {
        this.rangeHighest = d3Array.max(this.data.data, (d) => d3Array.max(d.range, (r) => r.point));
        this.newRangeHighest = this.rangeHighest;
      }

      // Calculate bar value for current range
      const helpMin = this.rangeLowest;
      const helpMax = this.rangeHighest;
      this.data.data.forEach(function (d) {
        d.value = 0;
        d.range.forEach(function (r) {
          if (r.point >= helpMin && r.point <= helpMax) {
            d.value += r.value;
          }
        });
      });
      // Set the options for the ngx-slider
      this.RangeOptions.floor = this.rangeLowest;
      this.RangeOptions.ceil = this.rangeHighest;
    }

    // Check if bars should be sorted
    if (this.isSorted === true) {
      // Sort by value
      this.data.data.sort((a: any, b: any) => b.value - a.value);
    } else {
      // Sort by bar labels
      // "Guess" if the bar labels are numbers
      if (isNaN(this.data.data[0].label)) { // --> true if not a number (NaN)
        // The bar labels are not numbers
        this.data.data.sort((a: any, b: any) => {
          if (a.label < b.label) { return -1; }
          if (a.label > b.label) { return 1; }
          return 0;
        });
      } else {
        // The bar labels are numbers
        this.data.data.sort((a: any, b: any) => a.label - b.label); // Works with numeric labels
      }
    }

    // Calculate the width of the bars on the x-axis
    this.x = d3Scale.scaleBand().range([0, this.chartWidth - this.margin.left - this.margin.right])
      .paddingInner(0.1)
      .paddingOuter(0.1)
      .align(0.5);
    // Get the labels for the x-axis
    this.x.domain(this.data.data.map((d) => d.label));

    // Set the scale of the y-axis (0 to chart height)
    this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);
    // Check if there are any bars to show (is the highest bar value not 0?)
    if (d3Array.max(this.data.data, (d) => d.value) !== 0) {
      // Get the values displayed along the y-axis (0 to highest bar value)
      // this.y.domain([0, d3Array.max(this.data.data, (d) => d.value)]);
      // Alsways keep the inital max bar value as the max y-axis value
      // ...this way it's easier to interpret potential changes of the bars by the user
      this.y.domain([0, this.initialMaxValue]);
    }
  }

  // Add the label of every entry to the axis
  private drawAxis() {
    // Add labels to the x-axis
    this.g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3Axis.axisBottom(this.x));

    // Add values to the y-axis
    this.gYaxis.append('g')
      .attr('class', 'axis axis--y')
      .call(d3Axis.axisLeft(this.y).ticks(10));

    // Check if axis labels are given
    if (this.data.metadata) {
      if (this.data.metadata.axes) {
        // Check if y-axis label is given
        if (this.data.metadata.axes.y) {
          // Append y-axis label
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
        }
        // Check if x-axis label is given
        if (this.data.metadata.axes.x) {
          // Append x-axis label
          this.g.append('g')
            .append('text')
            .attr(
              'transform',
              'translate('
              + ((this.chartWidth - this.margin.left - this.margin.right) / 2)
              + ','
              + (this.height + this.margin.top + 10) + ')'
            )
            .attr('fill', 'black')
            .attr('font-weight', 'bold')
            .style('text-anchor', 'middle')
            .text(this.data.metadata.axes.x);
        }
      }
    }
  }
  // Draw a bar to every entry, the height representing the value
  private drawBars() {
    this.g.selectAll('.bar')
      .data(this.data.data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => this.x(d.label))
      .attr('y', (d) => this.y(d.value))
      .attr('width', this.x.bandwidth())
      .attr('height', (d) => this.height - this.y(d.value));

    // Define tooltip
    const tooltip = d3.select('#barChartChart_' + this.numberOfInitialisedComponent)
      .append('div')
      .attr('class', 'barChartTooltip')
      .attr('id', 'barChartTooltip_' + this.numberOfInitialisedComponent);

    tooltip.append('div')
      .attr('class', 'barChartTooltipValue')
      .attr('id', 'barChartTooltipValue_' + this.numberOfInitialisedComponent);

    // Get all the bars
    const bar = this.svgChart.selectAll('.bar');

    // Apply mouseover events to each bar
    bar.on('mouseover', (d) => {
      tooltip.select('#barChartTooltipValue_' + this.numberOfInitialisedComponent).html(d.value);
      // Show the initially hidden tooltip div
      tooltip.style('display', 'block');
      // Calculate the tooltip position
      onmousemove = (e) => {
        this.posX = e.clientX + 20;
        this.posY = e.clientY - 20;
        tooltip
          .style('left', (this.posX) + 'px')
          .style('top', (this.posY) + 'px');
      };
      // Hide the tooltip div
      onmouseout = (e) => {
        tooltip.style('display', 'none');
      };
    });
  }
}

// Function to check if JSON data input is string
function IsJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
