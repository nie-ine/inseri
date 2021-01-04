import {AfterViewChecked, Component, Input} from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3ScaleChromatic from 'd3-scale-chromatic';
import * as d3Array from 'd3-array';
import * as d3Interpolate from 'd3-interpolate';
import {Options} from '@angular-slider/ngx-slider';

// The Pie Chart V2 app renders a pie chart based on JSON data input
// See inseri/Tutorials/App descriptions for Researchers/Apps to visualise data/Pie Chart V2

@Component({
  selector: 'app-pie-chart-v2',
  templateUrl: './pie-chart-v2.component.html',
  styleUrls: ['./pie-chart-v2.component.scss']
})

export class PieChartV2Component implements AfterViewChecked {
  // needed by inseri
  @Input() initialised = false;
  @Input() numberOfInitialisedComponent: number;
  @Input() data: any;

  alreadyInitialised = false;

  // Title of the component
  title = 'Pie Chart';

  // x/y position of tooltip
  private x: number;
  private y: number;

  // Set the chart margins, width, height, and radius
  private margin = {top: 20, right: 20, bottom: 30, left: 50};
  private readonly width: number;
  private readonly height: number;
  private readonly radius: number;

  // The pie generator
  private pie: any;

  // The pie chart SVG container
  private svgChart: any;

  // The pie chart SVG legend
  private svgLegend: any;

  // The 'current' piece of pie
  private _current: any;

  // Helper object for the tooltip content
  chosenSection: any = {};

  // Boolean to check if chart is being loaded or not
  chartLoading = true;

  // Boolean to indicate whether range feature should be displayed or not
  showRange = false;
  rangeLabel: 'Range';

  // Min/max value for the used ngx-slider as range slider
  // The values are set further down
  RangeOptions: Options = {
    floor: 0,
    ceil: 0
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

  // Initialize the chart with fixed sizes and margins
  constructor() {
    this.width = 600 - this.margin.left - this.margin.right;
    this.height = 400 - this.margin.top - this.margin.bottom;
    this.radius = Math.min(this.width, this.height) / 2;
  }

  // Small function to generate css classes for the DOM
  generateComponentDivClass( name: string ) {
    return name + this.numberOfInitialisedComponent;
  }

  // After initializing the component, initialize the chart
  ngAfterViewChecked() {
    if ( this.initialised && !this.alreadyInitialised && this.data ) {
      // Check if JSON input data is a string and therefore coming through the inseri microservice pipeline
      // If yes, parse string to JSON first, if no, use JSON input data as is
      if ( typeof this.data === 'string' && IsJsonString(this.data) && JSON.parse(this.data).length > 0 ) {
        const help = this.data;
        this.data = {};
        this.data.data = JSON.parse(help);
        this.alreadyInitialised = true;
        setTimeout(() => {
          // console.log( this.data );
          this.drawD3( this.data.data );
        }, 100);
        this.chartLoading = false;
      } else if ( typeof this.data !== 'string' ) {
        this.alreadyInitialised = true;
        setTimeout(() => {
          // console.log( this.data );
          this.drawD3( this.data.data );
        }, 100);
        this.chartLoading = false;
      }
    }
  }

  // Function to draw the chart
  drawD3( data: Array<any> ) {
    // Remove any already existing chart elements (needed if chart is re-drawn)
    d3.select('.chart' + this.numberOfInitialisedComponent).select('svg').remove();
    d3.select('.pieLegend' + this.numberOfInitialisedComponent).select('svg').remove();

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

      // Calculate pie value for current range
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

    // Set d3.js color scheme (it's an array of colors)
    const color = d3Scale.scaleOrdinal(d3ScaleChromatic.schemePaired);

    // Create SVG chart container
    this.svgChart = d3.select('.' + this.generateComponentDivClass('chart'))
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr('transform', 'translate(' + (this.width / 2) + ',' + (this.height / 2) + ')');

    // Create the arcs
    const arc = d3Shape.arc()
      .innerRadius(0) // none for pie chart
      .outerRadius(this.radius); // size of overall chart

    // Creating the pie generator
    this.pie = d3Shape.pie()
      .sort(null)
      // Use the pie.value() function to set the value property of the data returned by the pie generator function
      .value((d) =>  d.value);

    // Define tooltip
    const tooltip = d3.select('#chart')
      .append('div')
      .attr('class', 'tooltip');
    tooltip.append('div')
      .attr('class', 'label');
    tooltip.append('div')
      .attr('class', 'count');
    tooltip.append('div')
      .attr('class', 'percent');

    for ( const entry of data ) {
      entry.value = +entry.value; // Calculate count while iterating through the data
      entry.enabled = true; // Add enabled property to track which entries are checked
    }

    // Creating the chart with its arcs
    let path = this.svgChart.selectAll('path')
      .data(this.pie(data)) // Use the input data for the pie generator created earlier
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (d) => {
        return color(d.data.label);
      })
      .each((d) => {
        this._current - d;
      }); // Creates a smooth animation for each track

    // Mouse event handlers
    path.on('mouseover', (d, n, i) => {
      // Calculate the total number
      const total = d3Array.sum(data.map((d) => {
        return (d.enabled) ? d.value : 0;
      }));
      const percent = Math.round(1000 * d.data.value / total) / 10;

      // Set the values for the tooltip to be shown
      this.chosenSection.label = d.data.label;
      this.chosenSection.value = d.data.value;
      this.chosenSection.percent = percent;

      tooltip.select('.label').html(d.data.label);
      tooltip.select('.count').html(d.data.value);
      tooltip.select('.percent').html(percent + '%');
      // Show the tooltip
      tooltip.style('display', 'block');
    });

    path.on('mouseout', () => {
      // Hide the tooltip
      tooltip.style('display', 'none');
      this.chosenSection = {};
    });

    // Move the tooltip
    path.on('mousemove', (d) => {
      onmousemove = (e) => {
        this.x = e.clientX + 20;
        this.y = e.clientY - 20;
      };
    });

    // Create the legend
    this.svgLegend = d3.select('.' + this.generateComponentDivClass('pieLegend'))
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr('transform', 'translate(' + 0 + ',' + (this.height / 2) + ')');

    const legend = this.svgLegend.selectAll('.' + this.generateComponentDivClass('pieLegend'))
      .data(color.domain()) // Refers to an array of labels from our data!
      .enter()
      .append('g')
      .attr('transform', (d, i) => {
        const height = 25 + 6;
        const offset = height * color.domain().length / 2;
        const vert = i * height - offset;
        return 'translate(' + 0 + ',' + vert + ')';
      });

    // Add legend items (colored squares)
    legend.append('rect')
      .attr('width', 25)
      .attr('height', 25)
      .style('fill', color)
      .style('stroke', color)
      .attr('cursor', 'pointer')
      // Add click event to legend items
        // label (the datum (d) !!!) is the current label in the array of labels
        // i is the current index in the array of labels
        // n is the parent group of legend elements
      .on('click', (label, i, n) => {
        // Select the clicked legend item
        const rect = d3.select(n[i]);
        let enabled = true; // Set enabled true to default
        const totalEnabled = d3Array.sum(data.map((d) => { // Can't disable all options
          return (d.enabled) ? 1 : 0; // Return 1 for each enabled entry and summing it up
        }));

        if (rect.attr('class') === 'disabled') { // If class is disabled
          rect.attr('class', ''); // Remove class disabled
        } else {
          if (totalEnabled < 2) { // If less than two labels are flagged, exit
            return;
          }
          rect.attr('class', 'disabled'); // Otherwise flag the square disabled
          enabled = false; // Set enabled to false
        }

        // Update pie
        this.pie.value((d: any) => {
          if (d.label === label) {
            d.enabled = enabled;
          } // If entry label matches legend label
          return (d.enabled) ? d.value : 0; // Update enabled property and return count or 0 based on the entry"s status
        });

        path = path.data(this.pie(data)); // Update pie with new data

        path.transition() // Transition of re-drawn pie
          .duration(750)
          .attrTween('d', (d) => { // "d" specifies the d attribute that will be animated
            const interpolate = d3Interpolate.interpolate(this._current, d); // this = current path element
            this._current = interpolate(0); // Interpolate between current value and the new value of 'd'
            return (t) => {
              return arc(interpolate(t));
            };
          });
      });

    legend.append('text')
      .attr('x', 26 + 5)
      .attr('y', 25 - 6)
      .text((d) => {
        return d; // Return label
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
