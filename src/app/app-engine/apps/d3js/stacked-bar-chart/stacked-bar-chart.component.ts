import {AfterViewChecked, Component, Input} from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3ScaleChromatic from 'd3-scale-chromatic';
import * as d3Axis from 'd3-axis';
import * as d3Shape from 'd3-shape';

// The Stacked Bar Chart app renders a stacked bar chart based on JSON data input
// See inseri/Tutorials/App descriptions for Researchers/Apps to visualise data/Stacked Bar Chart

@Component({
  selector: 'app-stacked-bar-chart',
  templateUrl: './stacked-bar-chart.component.html',
  styleUrls: ['./stacked-bar-chart.component.scss']
})

export class StackedBarChartComponent implements AfterViewChecked {
  // Needed by inseri
  @Input() initialised = false;
  @Input() numberOfInitialisedComponent: number;
  @Input() data: any;
  alreadyInitialised = false;

  // Title of the component
  title = 'Stacked Bar Chart';

  // Dynamic initial width of the chart
  width: any;
  // Factor to calculate initial chart width
  chartWidthFactor = 100;

  // User provided chart width in the view
  newWidth: number;

  // Mouse x position for tooltip
  private posX: number;
  // Mouse y position for tooltip
  private posY: number;

  // Grouped bars sorted by total value?
  isSorted = false;

  constructor() {
  }

  // After initializing the component, initialize the SVG image
  ngAfterViewChecked() {
    if ( this.initialised && !this.alreadyInitialised && this.data && this.data.data ) {
      // Check if JSON input data is a string and therefore coming through the inseri microservice pipeline
      // If yes, parse string to JSON first, if no, use JSON input data as is
      if (typeof this.data === 'string' && IsJsonString(this.data) && JSON.parse(this.data).length > 0) {
        const help = this.data;
        this.data = {};
        this.data.data = JSON.parse(help);
        this.alreadyInitialised = true;
        setTimeout(() => {
          this.drawD3(this.data.data, 0);
        }, 500);
      } else if (typeof this.data !== 'string') {
        this.alreadyInitialised = true;
        setTimeout(() => {
          this.drawD3(this.data.data, 0);
        }, 500);
      }
    }
  }

  // Function to draw the complete chart and legend
  drawD3(data: Array<any>, width: number) {
    // Check if parameter width is 0 (which means the user did not manually provide a new chart width)
    if (width === 0) {
      width = this.data.data.length * this.chartWidthFactor;
    }

    // Set width to provided width
    this.width = width;
    // and the newWidth as well. The newWidth is shown in the width input field in the view
    this.newWidth = width;

    // Remove any already existing chart elements (needed if chart is re-drawn)
    d3.select('#chart_' + this.numberOfInitialisedComponent).select('svg').remove();
    d3.select('#yaxis_' + this.numberOfInitialisedComponent).select('svg').remove();
    d3.select('#legend_' + this.numberOfInitialisedComponent).select('svg').remove();

    // Get all the group names for the legend
    const keys = Object.keys(data[0]).slice(1);

    // Add a total value of all stacks to each bar
    data = data.map(v => {
      v.total = keys.map(key => v[key]).reduce((a, b) => a + b, 0);
      return v;
    });

    // Check if grouped bars should be sorted
    if (this.isSorted === true) {
      data.sort((a: any, b: any) => b.total - a.total);
    } else {
      // Sort by bar labels
      // "Guess" if the stacked bar labels are numbers
      if (isNaN(this.data.data[0].label)) {
        // The stacked bar labels are not numbers
        this.data.data.sort((a: any, b: any) => {
          if (a.label < b.label) { return -1; }
          if (a.label > b.label) { return 1; }
          return 0;
        });
      } else {
        // The stacked bar labels are numbers
        this.data.data.sort((a: any, b: any) => a.label - b.label);
      }
    }

    // Set the size of and spacing between legend squares
    const legendRectSize = 25;
    const legendSpacing = 6;

    // Set the fixed chart height
    const height = 350;

    // Set chart margins
    const margin = {
      top: 20,
      right: 20,
      bottom: 50,
      left: 40
    };

    // Set d3.js color scheme for the legend
    const color = d3Scale.scaleOrdinal(d3ScaleChromatic.schemePaired);

    // Create the y-axis SVG container
    const svgYaxis = d3.select('#yaxis_' + this.numberOfInitialisedComponent)
      .append('svg')
      .attr('width', 50)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')'); // translate along x-axis and y-axis

    // Create the chart SVG container
    const svgChart = d3.select('#chart_' + this.numberOfInitialisedComponent)
      .append('svg') // appending an <svg> element
      .attr('width', +width + +margin.left + +margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Create the SVG legend container
    const svgLegend = d3.select('#legend_' + this.numberOfInitialisedComponent)
      .append('svg') // appending an <svg> element
      .attr('width', 650 + margin.left + margin.right) // setting its width
      .attr('height', ( keys.length * (legendRectSize + legendSpacing)) + margin.top + margin.bottom) // setting its height
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Set the scale for the x-axis
    const x = d3Scale.scaleBand()
      .domain(data.map((d) => {
        return d.label;
      })) // returns array of all the labels for the x-axis (["Verse 1", "Verse 2", ...])
      .range([0, width])
      .paddingInner(0.1)
      .paddingOuter(0.5)
      .align(0.5);

    // Set the scale for the y-axis
    const y = d3Scale.scaleLinear()
      .domain([0, d3Array.max(data, (d: any) => d.total)])
      .range([height, 0])
      .nice(); // nicing the scale (ending on round values)


    // Always remove the "total" key again
    // otherwise it will be considered a stack the next time you
    // re-draw the chart because of a change in width
    data.map((d) => {
      delete d.total;
    });

    // Nested function to draw the stacks
    // Use the currently selected keys from the legend and the inseri-specific component number
    function drawStacks(currentKeys, numberOfInitialisedComponent) {
      // Remove any already present stacks for this chart (needed in case of re-drawing the chart)
      d3.selectAll('.gStack_' + numberOfInitialisedComponent).remove();
      svgChart.append('g')
        .attr('class', 'gStack_' + numberOfInitialisedComponent)
        .selectAll('g')
        .data(d3Shape.stack().keys(currentKeys)(data)) //// THIS IS WERE THE STACKS ARE MADE ////
        .enter()
        .append('g')
        .attr('fill', (d) => {
          return color(d.key);
        })
        .selectAll('rect')
        .data(d => d)
        .enter()
        .append('rect')
        .attr('class', 'barPart')
        .attr('x', d => x(d.data.label))
        .attr('y', d => y(d[1]))
        .attr('width', x.bandwidth())
        .attr('height', d => y(d[0]) - y(d[1]));
    }
    // Call the above function to draw the stacks
    drawStacks(keys, this.numberOfInitialisedComponent);

    // Append G container for the x-axis
    svgChart.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3Axis.axisBottom(x));

    // Appen G container for the y-axis
    svgYaxis.append('g')
      .attr('class', 'y')
      .call(d3Axis.axisLeft(y).ticks(null, 's'));

    // Check if there's metadata in the JSON data input
    if (this.data.metadata) {
      // Check if there's axes information
      if (this.data.metadata.axes) {
        // Check if there's information about the y-axis label
        if (this.data.metadata.axes.y) {
          svgYaxis.append('g')
            .append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', 0 - (margin.left + 3))
            .attr('x', 0 - (height / 2))
            .attr('dy', '1em')
            .attr('fill', 'black')
            .attr('font-weight', 'bold')
            .attr('text-anchor', 'middle')
            .text(this.data.metadata.axes.y);
        }
        // Check if there's information about the x-axis label
        if (this.data.metadata.axes.x) {
          svgChart.append('g')
            .append('text')
            .attr('transform', 'translate(' + width / 2 + ',' + (height + margin.top + 20) + ')')
            .attr('fill', 'black')
            .attr('font-weight', 'bold')
            .style('text-anchor', 'middle')
            .text(this.data.metadata.axes.x);
        }
      }
    }

    // Function to define tooltip for this chart
    function doTooltip( component, posX, posY ) {
      const tooltip = d3.select('#chart_' + component)
        .append('div')
        .attr('class', 'stackedBarChartTooltip')
        .attr('id', 'stackedBarChartTooltip_' + component);

      tooltip.append('div')
        .attr('class', 'stackedBarChartTooltipLabel')
        .attr('id', 'stackedBarChartTooltipLabel_' + component);

      tooltip.append('div')
        .attr('class', 'stackedBarChartTooltipCount')
        .attr('id', 'stackedBarChartTooltipCount_' + component);

      // Get all the stacks
      const barPart = svgChart.selectAll('.barPart');

      // Apply mouseover events to each single stack
      barPart.on('mouseover', (d) => {
        // Get the value of the current stack
        tooltip.select('#stackedBarChartTooltipCount_' + component).html(d[1] - d[0]);
        // Somebody might want to try to reach the label of the current stacked bar as well (?)
        // tooltip.select('#stackedBarChartTooltipCount_' + component).html( ... );

        // Show the initially hidden tooltip div
        tooltip.style('display', 'block');
        // Calculate the tooltip position
        onmousemove = (e) => {
          posX = e.clientX + 20;
          posY = e.clientY - 20;
          tooltip.style('left', (posX) + 'px')
            .style('top', (posY) + 'px');
        };
        // Hide the tooltip div
        onmouseout = (e) => {
          tooltip.style('display', 'none');
        };
      });

    }
    // Call above tooltip function for this chart
    doTooltip(this.numberOfInitialisedComponent, this.posX, this.posY);

    // Append the chart legend
    const legend = svgLegend.append('g')
      .selectAll('g')
      .data(keys.slice())
      .enter()
      .append('g')
      .attr('transform', (d, i) => {
        const thisHeight = legendRectSize + legendSpacing;
        const vert = i * thisHeight;
        return 'translate(' + -120 + ',' + vert + ')';
      });

    legend.append('rect')
      .attr('x', 150)
      .attr('width', legendRectSize)
      .attr('height', legendRectSize)
      .attr('fill', color)
      .attr('stroke', color)
      .attr('stroke-width', 2)
      .attr('cursor', 'pointer')
      .on('click', (d) => {
        update(d, this.numberOfInitialisedComponent, this.posX, this.posY);
      });

    legend.append('text')
      .attr('x', 200)
      .attr('y', legendRectSize - legendSpacing)
      .text((d) => {
        return d;
      });

    // Container to keep the unchecked groups of the legend
    let filtered = [];

    // Function to update the legend and chart when legend item is clicked
    function update(d, component, posX, posY) {
      // Update the array to filter the chart by
      if (filtered.indexOf(d) === -1) {
        // Add the clicked key if not in filtered[]
        filtered.push(d);
        // If all bars are un-checked, reset
        if (filtered.length === keys.length) {
          filtered = [];
        }
      } else {
        // Remove clicked key from filtered[]
        filtered.splice(filtered.indexOf(d), 1);
      }

      // Update the chart according to the currently selected stacks
      const newKeys = [];
      keys.forEach(function (d) {
        if (filtered.indexOf(d) === -1) {
          newKeys.push(d);
        }
      });
      // Re-draw chart and re-do tooltips
      drawStacks(newKeys, component);
      doTooltip(component, posX, posY);

      // Update the legend
      legend.selectAll('rect')
        .transition()
        .attr('fill', function (d) {
          if (filtered.length) {
            if (filtered.indexOf(d) === -1) {
              return color(d);
            } else {
              return 'white';
            }
          } else {
            return color(d);
          }
        })
        .duration(100);
    } // end of update()
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
