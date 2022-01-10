import {AfterViewChecked, Component, Input, ViewEncapsulation} from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3ScaleChromatic from 'd3-scale-chromatic';

// The Pie Chart app renders a basic pie chart based on JSON data input
// See inseri/Tutorials/App descriptions for Researchers/Apps to visualise data/Pie Chart

@Component({
  selector: 'app-pie-chart',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})

export class PieChartComponent implements AfterViewChecked {
  // needed by inseri
  @Input() initialised = false;
  @Input() numberOfInitialisedComponent: number;
  @Input() data: any;

  alreadyInitialised = false;

  // Title of the component
  title = 'Pie Chart';

  // Set chart margins
  private margin = {top: 20, right: 20, bottom: 30, left: 50};
  private width: number;
  private height: number;
  private radius: number;

  // The pie generator
  private pie: any;
  private arc: any;

  // The pie piece label
  private labelArc: any;

  // Colors for the pie pieces
  private color: any;

  // The svg chart container
  private svg: any;

  private _current: any;

  constructor() {
    this.width = 900 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
    this.radius = Math.min(this.width, this.height) / 2;
  }

  ngAfterViewChecked() {
    if (this.initialised && !this.alreadyInitialised && this.data) {
      // Check if JSON input data is a string and therefore coming through the inseri microservice pipeline
      // If yes, parse string to JSON first, if no, use JSON input data as is
        if ( typeof this.data === 'string' && IsJsonString(this.data) && JSON.parse(this.data).length > 0 ) {
          const help = this.data;
          this.data = {};
          this.data.data = JSON.parse(help);
          this.alreadyInitialised = true;
          setTimeout(() => {
            console.log( this.data );
            this.initSvg();
            this.drawPie();
          }, 100);
        } else if ( typeof this.data !== 'string' ) {
          this.alreadyInitialised = true;
          console.log( this.data );
          setTimeout(() => {
            this.initSvg();
            this.drawPie();
          }, 100);
        }
    }
  }

  // Small function to generate css classes for the DOM
  generateComponentDivClass() {
    return 'pieChart' + this.numberOfInitialisedComponent;
  }

  private initSvg() {
    // Set D3.js color scheme
    this.color = d3Scale.scaleOrdinal(d3ScaleChromatic.schemePaired);

    // Create the arcs
    this.arc = d3Shape.arc()
      .outerRadius(this.radius - 10)
      .innerRadius(0); // None for pie chart

    // Create the label arcs
    this.labelArc = d3Shape.arc()
      .outerRadius(this.radius - 40)
      .innerRadius(this.radius - 40);

    // Creating the pie generator
    this.pie = d3Shape.pie()
      .sort(null)
      // Use the pie.value() function to set the value property of the data returned by the pie generator function
      .value((d: any) => d.value);

    // Create the svg container for the chart
    this.svg = d3.select('.' + this.generateComponentDivClass())
      .append('svg')
      .attr('width', 1000)
      .attr('height', 500)
      .append('g')
      .attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')');
  }

  // Function to draw the pie chart
  private drawPie() {
    // Creating the chart with its arcs
    const g = this.svg.selectAll('.arc')
      .data(this.pie(this.data.data))
      .enter().append('g')
      .attr('class', 'arc');
    g.append('path').attr('d', this.arc)
      .style('fill', (d: any) => this.color(d.data.label) )
      .each( (d: any) =>  this._current - d );
    g.append('text').attr('transform', (d: any) => 'translate(' + this.labelArc.centroid(d) + ')')
      .attr('dy', '.35em')
      .text((d: any) => d.data.label);
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
