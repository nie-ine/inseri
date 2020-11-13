import {AfterViewChecked, Component, Input, OnInit} from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3ScaleChromatic from 'd3-scale-chromatic';
import * as d3Array from 'd3-array';
import * as d3Interpolate from 'd3-interpolate';
import {Options} from '@angular-slider/ngx-slider';


@Component({
  selector: 'app-pie-chart-v2',
  templateUrl: './pie-chart-v2.component.html',
  styleUrls: ['./pie-chart-v2.component.scss']
})
export class PieChartV2Component implements AfterViewChecked {
  @Input() initialised = false;
  @Input() numberOfInitialisedComponent: number;
  @Input() data: any;
  alreadyInitialised = false;
  title = 'Pie Chart';
  private x: number;
  private y: number;

  private margin = {top: 20, right: 20, bottom: 30, left: 50};
  private readonly width: number;
  private readonly height: number;
  private readonly radius: number;

  private pie: any;
  private svgChart: any;
  private svgLegend: any;
  private _current: any;
  chosenSection: any = {};
  private tooltip: any;
  chartLoading = true;

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

  constructor() {
    this.width = 600 - this.margin.left - this.margin.right;
    this.height = 400 - this.margin.top - this.margin.bottom;
    this.radius = Math.min(this.width, this.height) / 2;
  }

  generateComponentDivClass( name: string ) {
    return name + this.numberOfInitialisedComponent;
  }

  ngAfterViewChecked() {
    // console.log( this.numberOfInitialisedComponent, this.data );
    if ( this.initialised && !this.alreadyInitialised && this.data ) {
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

  drawD3( data: Array<any> ) {
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

    if (this.showRange === true) {
      this.rangeMinMin = d3Array.min(this.data.data, (d) => d3Array.min(d.range, (r) => r.point));
      this.rangeMaxMax = d3Array.max(this.data.data, (d) => d3Array.max(d.range, (r) => r.point));
      this.rangeMinMax = this.rangeMaxMax;
      this.rangeMaxMin = this.rangeMinMax;
      if (this.newRangeLowest !== undefined) { // User indicated a new min
        this.rangeLowest = this.newRangeLowest;
        this.rangeMaxMin = this.rangeLowest;
      } else {
        this.rangeLowest = d3Array.min(this.data.data, (d) => d3Array.min(d.range, (r) => r.point));
        this.newRangeLowest = this.rangeLowest;
      }
      if (this.newRangeHighest !== undefined) { // User indicated a new max
        this.rangeHighest = this.newRangeHighest;
        this.rangeMinMax = this.rangeHighest;
      } else {
        this.rangeHighest = d3Array.max(this.data.data, (d) => d3Array.max(d.range, (r) => r.point));
        this.newRangeHighest = this.rangeHighest;
      }
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
      this.RangeOptions.floor = this.rangeLowest;
      this.RangeOptions.ceil = this.rangeHighest;
    }

    const color = d3Scale.scaleOrdinal(d3ScaleChromatic.schemePaired);

    this.svgChart = d3.select('.' + this.generateComponentDivClass('chart'))
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr('transform', 'translate(' + (this.width / 2) + ',' + (this.height / 2) + ')');

    const arc = d3Shape.arc()
      .innerRadius(0) // none for pie chart
      .outerRadius(this.radius); // size of overall chart

    this.pie = d3Shape.pie()
      .sort(null)
      .value((d) =>  d.value);

    // define tooltip
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
      console.log( data );
      entry.value = +entry.value; // calculate count as we iterate through the data
      entry.enabled = true; // add enabled property to track which entries are checked
    }

    // creating the chart
    let path = this.svgChart.selectAll('path')
      .data(this.pie(data))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (d) => {
        return color(d.data.label);
      })
      .each((d) => {
        this._current - d;
      }); // creates a smooth animation for each track

    // mouse event handlers
    path.on('mouseover', (d, n, i) => {
      // calculate the total number
      const total = d3Array.sum(data.map((d) => {
        return (d.enabled) ? d.value : 0;
      }));
      const percent = Math.round(1000 * d.data.value / total) / 10;
      // console.log( d.data.label, d.data.value, percent );

      this.chosenSection.label = d.data.label;
      this.chosenSection.value = d.data.value;
      this.chosenSection.percent = percent;

      tooltip.select('.label').html(d.data.label);
      tooltip.select('.count').html(d.data.value);
      tooltip.select('.percent').html(percent + '%');
      tooltip.style('display', 'block');
    });

    path.on('mouseout', () => {
      tooltip.style('display', 'none');
      this.chosenSection = {};
    });

    path.on('mousemove', (d) => {
      onmousemove = (e) => {
        this.x = e.clientX + 20;
        this.y = e.clientY - 20;
      };
    });

    this.svgLegend = d3.select('.' + this.generateComponentDivClass('pieLegend'))
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr('transform', 'translate(' + 0 + ',' + (this.height / 2) + ')');

    const legend = this.svgLegend.selectAll('.' + this.generateComponentDivClass('pieLegend'))
      .data(color.domain()) // refers to an array of labels from our data
      .enter()
      .append('g')
      .attr('transform', (d, i) => {
        const height = 25 + 6;
        const offset = height * color.domain().length / 2;
        const vert = i * height - offset;
        return 'translate(' + 0 + ',' + vert + ')';
      });

    // adding colored squares to legend
    legend.append('rect')
      .attr('width', 25)
      .attr('height', 25)
      .style('fill', color)
      .style('stroke', color)
      .attr('cursor', 'pointer')
      .on('click', (label, i, n) => {
        // console.log( this, n, i );
        // console.log( n[ i ] );
        const rect = d3.select(n[i]);
        let enabled = true; // set enabled true to default
        const totalEnabled = d3Array.sum(data.map((d) => { // can't disable all options
          return (d.enabled) ? 1 : 0; // return 1 for each enabled entry. and summing it up
        }));

        if (rect.attr('class') === 'disabled') { // if class is disabled
          rect.attr('class', ''); // remove class disabled
        } else { // else
          if (totalEnabled < 2) {
            return;
          } // if less than two labels are flagged, exit
          rect.attr('class', 'disabled'); // otherwise flag the square disabled
          enabled = false; // set enabled to false
        }

        this.pie.value((d: any) => {
          if (d.label === label) {
            d.enabled = enabled;
          } // if entry label matches legend label
          return (d.enabled) ? d.value : 0; // update enabled property and return count or 0 based on the entry"s status
        });

        path = path.data(this.pie(data)); // update pie with new data

        path.transition() // transition of redrawn pie
          .duration(750) //
          .attrTween('d', (d) => { // "d" specifies the d attribute that we'll be animating
            const interpolate = d3Interpolate.interpolate(this._current, d); // this = current path element
            this._current = interpolate(0); // interpolate between current value and the new value of 'd'
            return (t) => {
              return arc(interpolate(t));
            };
          });
      });

    legend.append('text')
      .attr('x', 26 + 5)
      .attr('y', 25 - 6)
      .text((d) => {
        return d; // return label
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
