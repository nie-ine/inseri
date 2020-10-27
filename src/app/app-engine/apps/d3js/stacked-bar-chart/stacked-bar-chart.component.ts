import {AfterViewChecked, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3ScaleChromatic from 'd3-scale-chromatic';
import * as d3Axis from 'd3-axis';
import * as d3Shape from 'd3-shape';

@Component({
  selector: 'app-stacked-bar-chart',
  // encapsulation: ViewEncapsulation.None,
  templateUrl: './stacked-bar-chart.component.html',
  styleUrls: ['./stacked-bar-chart.component.scss']
})
export class StackedBarChartComponent implements AfterViewChecked {
  @Input() initialised = false;
  @Input() numberOfInitialisedComponent: number;
  @Input() data: any;
  title = 'Grouped Bar Chart';
  alreadyInitialised = false;
  width: any;
  newWidth: number;
  private posX: number;
  private posY: number;
  chartWidthFactor = 100;
  titleYaxis: string;
  isSorted = false;
  // isSorted = true;

  constructor() {
  }

  ngAfterViewChecked() {
    // console.log( this.numberOfInitialisedComponent, this.data );
    if ( this.initialised && !this.alreadyInitialised && this.data && this.data.data ) {
      if (typeof this.data === 'string' && IsJsonString(this.data) && JSON.parse(this.data).length > 0) {
        const help = this.data;
        this.data = {};
        this.data.data = JSON.parse(help);
        this.alreadyInitialised = true;
        setTimeout(() => {
          // console.log( this.data );
          this.drawD3(this.data.data, 0);
        }, 500);
      } else if (typeof this.data !== 'string') {
        this.alreadyInitialised = true;
        setTimeout(() => {
          // console.log(this.data);
          this.drawD3(this.data.data, 0);
        }, 500);
      }
    }
  }

  drawD3(data: Array<any>, width: number) {
    // console.log(width);
    if (width === 0) {
      width = this.data.data.length * this.chartWidthFactor;
    }

    this.width = width;
    this.newWidth = width;

    // Remove current chart elements if already there
    d3.select('#chart_' + this.numberOfInitialisedComponent).select('svg').remove();
    d3.select('#yaxis_' + this.numberOfInitialisedComponent).select('svg').remove();
    d3.select('#legend_' + this.numberOfInitialisedComponent).select('svg').remove();

    // getting all the key names for the legend
    const keys = Object.keys(data[0]).slice(1);

    data = data.map(v => {
      v.total = keys.map(key => v[key]).reduce((a, b) => a + b, 0);
      return v;
    });

    if (this.isSorted === true) {
      data.sort((a: any, b: any) => b.total - a.total);
    }

    // setting size of and spacing between legend squares
    const legendRectSize = 25;
    const legendSpacing = 6;

    // setting svg chart dimensions
    // this.width = width !== undefined ? width : this.data.data.length * 100;
    const height = 350;

    // setting margins
    const margin = {
      top: 20,
      right: 20,
      bottom: 50,
      left: 40
    };

    // setting a d3.js color scheme for the legend
    // const color = d3Scale.scaleOrdinal(d3ScaleChromatic.schemeRdYlBu[keys.length]);
    const color = d3Scale.scaleOrdinal(d3ScaleChromatic.schemePaired);

    // creating the yaxis
    const svgYaxis = d3.select('#yaxis_' + this.numberOfInitialisedComponent)
      .append('svg')
      .attr('width', 50)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')'); // translate along x-axis and y-axis

    // creating the chart
    const svgChart = d3.select('#chart_' + this.numberOfInitialisedComponent)
      .append('svg') // appending an <svg> element
      .attr('width', +width + +margin.left + +margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // creating the legend
    const svgLegend = d3.select('#legend_' + this.numberOfInitialisedComponent)
      .append('svg') // appending an <svg> element
      .attr('width', 650 + margin.left + margin.right) // setting its width
      .attr('height', ( keys.length * (legendRectSize + legendSpacing)) + margin.top + margin.bottom) // setting its height
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // scale for the x-axis (spacing the groups)
    const x0 = d3Scale.scaleBand()
      .domain(data.map((d) => {
        return d.label;
      })) // returns array of all the labels for the x-axis (["Verse 1", "Verse 2", ...])
      .range([0, width])
      .paddingInner(0.1)
      .paddingOuter(0.5)
      .align(0.5);

    // scale for the y-axis
    const y = d3Scale.scaleLinear()
      .domain([0, d3Array.max(data, (d: any) => d.total)])
      .range([height, 0])
      .nice(); // nicing the scale (ending on round values)

    // Always sort data back by label
    data.sort((a: any, b: any) => a.label - b.label);
    console.log(data);
    // ...and remove the 'total' key
    data.map((d) => {
      delete d.total;
    });

    svgChart.append('g')
      .selectAll('g')
      .data(d3Shape.stack().keys(keys)(data))
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
      .attr('x', d => x0(d.data.label))
      .attr('y', d => y(d[1]))
      .attr('width', x0.bandwidth())
      .attr('height', d => y(d[0]) - y(d[1]));

    svgChart.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3Axis.axisBottom(x0));

    svgYaxis.append('g')
      .attr('class', 'y')
      .call(d3Axis.axisLeft(y).ticks(null, 's'));

    if (this.data.metadata) {
      svgYaxis.append('g')
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 0 - (margin.left + 3))
        .attr('x', 0 - (height / 2))
        .attr('dy', '1em')
        .attr('fill', 'black')
        .attr('font-weight', 'bold')
        .attr('text-anchor', 'middle')
        .text(this.data.metadata.yAxis);

      svgChart.append('g')
        .append('text')
        .attr('transform', 'translate(' + width / 2 + ',' + (height + margin.top + 20) + ')')
        .attr('fill', 'black')
        .attr('font-weight', 'bold')
        .style('text-anchor', 'middle')
        .text(this.data.metadata.xAxis);
    }

    // define tooltip
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

    const barPart = svgChart.selectAll('.barPart');

    barPart.on('mouseover', (d) => {
      tooltip.select('#groupedBarChartTooltipLabel_' + this.numberOfInitialisedComponent).html(d.key);
      tooltip.select('#groupedBarChartTooltipCount_' + this.numberOfInitialisedComponent).html(d.value);
      tooltip.style('display', 'block');

      onmousemove = (e) => {
        this.posX = e.clientX + 20;
        this.posY = e.clientY - 20;
        tooltip.style('left', (this.posX) + 'px')
          .style('top', (this.posY) + 'px');
      };

      onmouseout = (e) => {
        tooltip.style('display', 'none');
      };
    });

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
      .attr('cursor', 'pointer');
      // .on('click', (d) => {
      //   update(d);
      // });

    legend.append('text')
      .attr('x', 200)
      .attr('y', legendRectSize - legendSpacing)
      .text((d) => {
        return d;
      });

    // let filtered = [];
    //
    // function update(d) {
    //   // update the array to filter the chart by:
    //
    //   // add the clicked key if not included:
    //   if (filtered.indexOf(d) === -1) {
    //     filtered.push(d);
    //     // if all bars are un-checked, reset:
    //     if (filtered.length === keys.length) {
    //       filtered = [];
    //     }
    //   } else {
    //     filtered.splice(filtered.indexOf(d), 1);
    //   }
    //
    //   // update the scales for each group(/states)'s items:
    //   const newKeys = [];
    //   keys.forEach(function (d) {
    //     if (filtered.indexOf(d) === -1) {
    //       newKeys.push(d);
    //     }
    //   });
    //   x1.domain(newKeys).rangeRound([0, x0.bandwidth()]);
    //   y.domain([0, d3Array.max(data, function (d) {
    //     return d3Array.max(keys, function (key) {
    //       if (filtered.indexOf(key) === -1) {
    //         return d[key];
    //       }
    //     });
    //   })]).nice();
    //
    //   // update the y axis:
    //   svgYaxis.select('.y')
    //     .transition()
    //     .call(d3Axis.axisLeft(y).ticks(null, 's'))
    //     .duration(500);
    //
    //   // filter out the bands that need to be hidden:
    //   const bars = svgChart.selectAll('.bar').selectAll('rect')
    //     .data(function (d) {
    //       return keys.map(function (key) {
    //         return {key: key, value: d[key]};
    //       });
    //     });
    //
    //   bars.filter(function (d) {
    //     return filtered.indexOf(d.key) > -1;
    //   })
    //     .transition()
    //     .attr('x', function (d) {
    //       return (+d3.select(this).attr('x')) + (+d3.select(this).attr('width')) / 2;
    //     })
    //     .attr('height', 0)
    //     .attr('width', 0)
    //     .attr('y', function (d) {
    //       return height;
    //     })
    //     .duration(500);
    //
    //   // adjust the remaining bars:
    //   bars.filter(function (d) {
    //     return filtered.indexOf(d.key) === -1;
    //   })
    //     .transition()
    //     .attr('x', function (d) {
    //       return x1(d.key);
    //     })
    //     .attr('y', function (d) {
    //       return y(d.value);
    //     })
    //     .attr('height', function (d) {
    //       return height - y(d.value);
    //     })
    //     .attr('width', x1.bandwidth())
    //     .attr('fill', function (d) {
    //       return color(d.key);
    //     })
    //     .duration(500);
    //
    //   // update legend:
    //   legend.selectAll('rect')
    //     .transition()
    //     .attr('fill', function (d) {
    //       if (filtered.length) {
    //         if (filtered.indexOf(d) === -1) {
    //           return color(d);
    //         } else {
    //           return 'white';
    //         }
    //       } else {
    //         return color(d);
    //       }
    //     })
    //     .duration(100);
    // }

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
