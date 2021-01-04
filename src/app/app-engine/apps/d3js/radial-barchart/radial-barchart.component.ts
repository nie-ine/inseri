import {AfterViewChecked, Component, Input, ViewEncapsulation} from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import * as d3Shape from 'd3-shape';
import * as d3ScaleChromatic from 'd3-scale-chromatic';

// The Pie Chart app renders a basic radial bar chart based on JSON data input
// See inseri/Tutorials/App descriptions for Researchers/Apps to visualise data/Radial Bar Chart

// Based on https://bl.ocks.org/bricedev/8aaef92e64007f882267

@Component({
  selector: 'app-radial-barchart',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './radial-barchart.component.html',
  styleUrls: ['./radial-barchart.component.scss']
})

export class RadialBarchartComponent implements AfterViewChecked {
  // needed by inseri
  @Input() initialised = false;
  @Input() numberOfInitialisedComponent: number;
  @Input() data;
  alreadyInitialised = false;

  // Chart width
  width = 600;

  // Chart height
  height = 600;

  // "Height" of each bar segment (it's the radius of the circle)
  barHeight = this.height / 2 - 40;

  // Array of colors to use for the bars
  color: any;

  // The svg container to draw the chart to
  svg: any;

  // The circular x axis scale
  private x: any;
  // The circular y axis scale (no y axis needed)
  // private y: any;

  // The actual x axis
  xAxis: any;

  // An array holding the min and max value of the bars
  extent: any;

  // The scale of the possible (radial) bars
  barscale: any;

  // The labels to use for each bar segment
  keys: any;

  // The number of keys (this.keys.length)
  numBars: any;

  // A svg <g> element
  g: any;

  // Circles for the radial x axis (currently not in use)
  // circles: any;

  // The arcs for the bar segments
  arc: any;

  // The bar segments
  segments: any;

  // The lines separating the bar segments
  lines: any;

  // The radius to use for the placement of the bar segment labels
  labelRadius: any;

  // The labels of the bar segments
  labels: any;

  // The centre of the chart
  centreOfTheImage = this.width / 2;

  // x/y position of tooltip
  private xPos: number;
  private yPos: number;

  // Helper object for the tooltip content
  chosenSection: any = {};

  constructor() { }

  ngAfterViewChecked() {
    if (this.initialised && !this.alreadyInitialised && this.data) {
      // Check if JSON input data is a string and therefore coming through the inseri microservice pipeline
      // If yes, parse string to JSON first, if no, use JSON input data as is
      if (typeof this.data === 'string' && IsJsonString(this.data) && JSON.parse(this.data).length > 0) {
        const help = this.data;
        this.data = {};
        this.data.data = JSON.parse(help);
        this.alreadyInitialised = true;
        setTimeout(() => {
          this.color = d3Scale.scaleOrdinal(d3ScaleChromatic.schemePaired);
          this.initSvg();
          this.initAxis();
        }, 100);
      } else if (typeof this.data !== 'string') {
        this.alreadyInitialised = true;
        setTimeout(() => {
          this.color = d3Scale.scaleOrdinal(d3ScaleChromatic.schemePaired);
          this.initSvg();
          this.initAxis();
        }, 100);
      }
    }
  }

  // Small function to generate css classes for the DOM
  generateComponentDivClass() {
    return 'radialBarChart' + this.numberOfInitialisedComponent;
  }

  // Function to create the svg container holding the chart
  initSvg() {
    this.svg = d3.select('.' + this.generateComponentDivClass())
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')');
  }

  // Function to create the radial bar chart
  private initAxis() {
    this.extent = d3Array.extent(this.data.data, (d) => d.value );

    this.barscale = d3Scale.scaleLinear()
      .domain(this.extent)
      .range([0, this.barHeight]);

    this.keys = this.data.data.map((d) => d.label);

    this.numBars = this.keys.length;

    this.x = d3Scale.scaleLinear()
      .domain(this.extent)
      .range([0, -this.barHeight]);


    this.xAxis = d3Axis.axisLeft(this.x);
    // Uncomment below lines if you want to display axis ticks (circles in this case)
    // ...along the radial x axis

      // .ticks(3)
      // .tickFormat(d3Format.format('s'));
      // .tickFormat(this.formatNumber);

    // this.circles = this.svg.selectAll('circle')
    //   .data(this.x.ticks(3))
    //   .enter()
    //   .append('circle')
    //   .attr('r', (d) => this.barscale(d))
    //   .style('fill', 'none')
    //   .style('stroke', 'black')
    //   .style('stroke-dasharray', '2,2')
    //   .style('stroke-width', '.5px');

    this.arc = d3Shape.arc()
      .startAngle( (d, i) => ( i * 2 * Math.PI) / this.numBars )
      .endAngle( ( d, i ) => ( (i + 1) * 2 * Math.PI) / this.numBars )
      .innerRadius(0);

    this.segments = this.svg.selectAll('path')
      .data(this.data.data)
      .enter()
      .append('path')
      .attr('class', 'segment')
      .each( (d) => d.outerRadius = this.barscale(+d.value))
      .style('fill',  (d) =>  this.color(d.label) )
      .attr('d', this.arc);

    // Define tooltip
    const tooltip = d3.select('.radialBarChart' + this.numberOfInitialisedComponent)
      .append('div')
      .attr('class', 'count');

    // Mouse event handlers
    const segments = d3.selectAll('.segment');

    segments.on('mouseover', (d) => {
      // Set the values for the tooltip to be shown
      this.chosenSection.value = +d.value;
    });

    segments.on('mouseout', () => {
      // Hide the tooltip
      tooltip.style('display', 'none');
      this.chosenSection = {};
    });

    // Move the tooltip
    segments.on('mousemove', (d) => {
      onmousemove = (e) => {
        this.xPos = e.clientX + 20;
        this.yPos = e.clientY - 20;
      };
    });

    this.svg.append('circle')
      .attr('r', this.barHeight)
      .classed('outer', true)
      .style('fill', 'none')
      .style('stroke', 'black')
      .style('stroke-width', '1.5px'
      );

    this.lines = this.svg.selectAll('line')
      .data(this.keys)
      .enter().append('line')
      // .attr('y2', -this.barHeight) - 20)
      .attr('y2', -this.barHeight)
      .style('stroke', 'black')
      .style('stroke-width', '.5px')
      .attr('transform', (d, i) => 'rotate(' + (i * 360 / this.numBars) + ')');

    this.labelRadius = this.barHeight * 1.025;

    this.labels = this.svg.append('g')
      .classed('labels', true);

    this.labels.append('def')
      .append('path')
      .attr('id', 'label-path')
      .attr('d', 'm0 ' + -this.labelRadius + 'a' + this.labelRadius + ' ' + this.labelRadius + ' 0 1,1 -0.01 0');

    this.labels.selectAll('text')
      .data(this.keys)
      .enter().append('text')
      .style('text-anchor', 'middle')
      .style('fill', (d, i) => {
        return '#3e3e3e';
      })
      .append('textPath')
      .attr('xlink:href', '#label-path')
      .attr('startOffset', (d, i) => {
        return i * 100 / this.numBars + 50 / this.numBars + '%';
      })
      .text( (d) => {
        return d.toUpperCase();
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
