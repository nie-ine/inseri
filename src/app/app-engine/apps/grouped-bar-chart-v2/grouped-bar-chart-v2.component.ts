import {AfterViewChecked, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3ScaleChromatic from 'd3-scale-chromatic';
import * as d3Axis from 'd3-axis';

@Component({
  selector: 'app-grouped-bar-chart-v2',
  templateUrl: './grouped-bar-chart-v2.component.html',
  styleUrls: ['./grouped-bar-chart-v2.component.scss']
})
export class GroupedBarChartV2Component implements AfterViewChecked {
  // Needed by inseri
  @Input() initialised = false;
  @Input() numberOfInitialisedComponent: number;
  @Input() data: any;
  alreadyInitialised = false;

  // Title of the component
  title = 'Grouped Bar Chart';

  // Fixed height of the chart
  height = 350;

  // Dynamic initial width of the chart
  width: any;
  // Factor to calculate initial chart width
  chartWidthFactor = 100;

  // User provided chart width in the view
  newWidth: any;

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
    if ( width === 0 ) {
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

    // Check if grouped bars should be sorted
    if (this.isSorted === true) {
      // Add a total value of all bars of each x-axis item
      data = data.map(v => {
        v.total = keys.map(key => v[key]).reduce((a, b) => a + b, 0);
        return v;
      });
      // Sort grouped bars by total value
      data.sort((a: any, b: any) => b.total - a.total);
    } else {
      // Sort by bar labels
      // "Guess" if the grouped bar labels are numbers
      if (isNaN(this.data.data[0].label)) {
        // The grouped bar labels are not numbers
        this.data.data.sort((a: any, b: any) => {
          if (a.label < b.label) { return -1; }
          if (a.label > b.label) { return 1; }
          return 0;
        });
      } else {
        // The grouped bar labels are numbers
        this.data.data.sort((a: any, b: any) => a.label - b.label);
      }
    }

    // Always remove the "total" key again
    // otherwise it will be considered a group the next time you
    // re-draw the chart because of a change in width
    data.map((d) => {
      delete d.total;
    });

    // Set the size of and spacing between legend squares
    const legendRectSize = 25;
    const legendSpacing = 6;

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
      .attr('height', this.height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')'); // translate along x-axis and y-axis

    // Create the chart SVG container
    const svgChart = d3.select('#chart_' + this.numberOfInitialisedComponent)
      .append('svg')
      .attr('width', +width + +margin.left + +margin.right)
      .attr('height', this.height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Create the SVG legend container
    const svgLegend = d3.select('#legend_' + this.numberOfInitialisedComponent)
      .append('svg') // appending an <svg> element
      .attr('width', 650 + margin.left + margin.right) // setting its width
      .attr('height', ( keys.length * (legendRectSize + legendSpacing)) + margin.top + margin.bottom) // setting its height
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Set the scale for the x-axis (spacing the groups)
    const x0 = d3Scale.scaleBand()
      .domain(data.map((d) => {
        return d.label;
      })) // returns array of all the labels for the x-axis (["Verse 1", "Verse 2", ...])
      .range([0, width])
      .paddingInner(0.1)
      .paddingOuter(0.5)
      .align(0.5);

    // Set the scale for the bars per above given group (spacing each group's bars)
    const x1 = d3Scale.scaleBand()
      .domain(keys)
      .range([0, x0.bandwidth()])
      .paddingInner(0);

    // Set the scale for the y-axis
    const y = d3Scale.scaleLinear()
      .domain([0, d3Array.max(data, (d) => {
        return d3Array.max(keys, (key) => {
          return d[key]; // returns the highest of all values
        });
      })])
      .range([this.height, 0])
      .nice(); // nicing the scale (ending on round values)

    svgChart.append('g')
      .selectAll('g')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'bar')
      .attr('transform', (d) => {
        return 'translate(' + x0(d.label) + ',0)';
      })
      .selectAll('rect')
      .data((d) => {
        return keys.map((key) => {
          return {key: key, value: d[key]};
        });
      })
      .enter()
      .append('rect')
      .attr('class', 'barPart')
      .attr('x', (d) => {
        return x1(d.key);
      })
      .attr('y', (d) => {
        return y(d.value);
      })
      .attr('width', x1.bandwidth())
      .attr('height', (d) => {
        return this.height - y(d.value);
      })
      .attr('fill', (d) => {
        return color(d.key);
      });

    svgChart.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3Axis.axisBottom(x0));

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
            .attr('x', 0 - (this.height / 2))
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
            .attr('transform', 'translate(' + width / 2 + ',' + (this.height + margin.top + 20) + ')')
            .attr('fill', 'black')
            .attr('font-weight', 'bold')
            .style('text-anchor', 'middle')
            .text(this.data.metadata.axes.x);
        }
      }
    }

    // Define tooltip
    const tooltip = d3.select('#chart_' + this.numberOfInitialisedComponent)
      .append('div')
      .attr('class', 'groupedBarChartTooltip')
      .attr('id', 'groupedBarChartTooltip_' + this.numberOfInitialisedComponent);

    tooltip.append('div')
      .attr('class', 'groupedBarChartTooltipLabel')
      .attr('id', 'groupedBarChartTooltipLabel_' + this.numberOfInitialisedComponent);

    tooltip.append('div')
      .attr('class', 'groupedBarChartTooltipCount')
      .attr('id', 'groupedBarChartTooltipCount_' + this.numberOfInitialisedComponent);

    // Get all the single bars
    const barPart = svgChart.selectAll('.barPart');

    // Apply mouseover events to each single bar
    barPart.on('mouseover', (d) => {
      // Get the label of the current bar
      tooltip.select('#groupedBarChartTooltipLabel_' + this.numberOfInitialisedComponent).html(d.key);
      // Get the value of the current bar
      tooltip.select('#groupedBarChartTooltipCount_' + this.numberOfInitialisedComponent).html(d.value);
      // Show the initially hidden tooltip div
      tooltip.style('display', 'block');
      // Calculate the tooltip position
      onmousemove = (e) => {
        this.posX = e.clientX + 20;
        this.posY = e.clientY - 20;
        tooltip.style('left', (this.posX) + 'px')
          .style('top', (this.posY) + 'px');
      };
      // Hide the tooltip div
      onmouseout = (e) => {
        tooltip.style('display', 'none');
      };
    });

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
        update(d, this.height); // Call update function below when clicking on a legend item
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
    function update(d, height) {
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
      // Update the scales for each group's items
      const newKeys = [];
      keys.forEach(function (d) {
        if (filtered.indexOf(d) === -1) {
          newKeys.push(d);
        }
      });
      x1.domain(newKeys).rangeRound([0, x0.bandwidth()]);

      // Commented out as you don't want to update the y-axis domain (!):

      // y.domain([0, d3Array.max(data, function (d) {
      //   return d3Array.max(keys, function (key) {
      //     if (filtered.indexOf(key) === -1) {
      //       return d[key];
      //     }
      //   });
      // })]).nice();

      // Update the y-axis
      svgYaxis.select('.y')
        .transition()
        .call(d3Axis.axisLeft(y).ticks(null, 's'))
        .duration(500);

      // Filter out the bands that need to be hidden
      const bars = svgChart.selectAll('.bar').selectAll('rect')
        .data(function (d) {
          return keys.map(function (key) {
            return {key: key, value: d[key]};
          });
        });

      bars.filter(function (d) {
        return filtered.indexOf(d.key) > -1;
      })
        .transition()
        .attr('x', function (d) {
          return (+d3.select(this).attr('x')) + (+d3.select(this).attr('width')) / 2;
        })
        .attr('height', 0)
        .attr('y', function (d) {
          return height;
        })
        .duration(500);

      // Adjust the remaining bars
      bars.filter(function (d) {
        return filtered.indexOf(d.key) === -1;
      })
        .transition()
        .attr('x', function (d) {
          return x1(d.key);
        })
        .attr('y', function (d) {
          return y(d.value);
        })
        .attr('height', function (d) {
          return height - y(d.value);
        })
        .attr('fill', function (d) {
          return color(d.key);
        })
        .duration(500);

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
    }
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
