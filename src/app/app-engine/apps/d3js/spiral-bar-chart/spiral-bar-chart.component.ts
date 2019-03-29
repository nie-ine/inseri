import {AfterViewChecked, Component, Input, OnInit} from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import * as d3Format from 'd3-format';
import * as d3Shape from 'd3-shape';
import * as d3Interpolate from 'd3-interpolate';
import * as d3ScaleChromatic from 'd3-scale-chromatic';
import * as d3TimeFormat from 'd3-time-format';

@Component({
  selector: 'app-spiral-bar-chart',
  templateUrl: './spiral-bar-chart.component.html',
  styleUrls: ['./spiral-bar-chart.component.scss']
})
export class SpiralBarChartComponent implements AfterViewChecked {

  @Input() initialised = false;
  @Input() numberOfInitialisedComponent: number;

  title = 'Spiral Bar Chart';
  alreadyInitialised = false;

  private width = 500;
  private height = 500;
  private start = 0;
  private end = 2.25;
  numSpirals = 3;
  private margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
  };

  // used to assign nodes color by group
  private color = d3Scale.scaleOrdinal(
    d3ScaleChromatic.schemeCategory10
  );

  r: any;
  radius: any;
  svg: any;
  points: any;
  spiral: any;
  path: any;
  spiralLength: any;
  N: any;
  barWidth: any;
  someData = [];
  timeScale: any;
  yScale: any;
  tF: any;
  firstInMonth = {};
  tooltip: any;

  constructor() { }

  ngAfterViewChecked() {
    if ( this.initialised && !this.alreadyInitialised ) {
      this.alreadyInitialised = true;
      this.r = 100;

      // console.log( this.r );

      this.radius = d3Scale.scaleLinear()
        .domain( [ this.start, this.end ] )
        .range( [ 40, this.r ] );

      // console.log( this.radius );

      this.svg = d3.select(
        '.' + this.generateComponentDivClass()
      ).append('svg')
        .attr('width', this.width + this.margin.right + this.margin.left)
        .attr('height', this.height + this.margin.left + this.margin.right)
        .append('g')
        .attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')');

      this.points = d3Array.range(
        this.start,
        this.end + 0.001,
        (
          this.end - this.start
        ) / 1000
      );

      // console.log( this.points );

      this.spiral = d3Shape.radialLine()
        .curve(d3Shape.curveCardinal)
        .angle(
          this.theta( this.r )  // theta
        )
        .radius(this.radius);

      // console.log( this.spiral );

      this.svg.append('path')
        .datum(this.points)
        .attr('id', 'spiral')
        .attr('d', this.spiral)
        .style('fill', 'none')
        .style('stroke', 'steelblue');
      //
      // this.spiralLength = this.path.node().getTotalLength();
      // this.N = 365;
      // this.barWidth = ( this.spiralLength / this.N ); // -1 rausgenommen
      //
      // console.log( this.barWidth );
      //
      // for (let i = 0; i < this.N; i++) {
      //   const currentDate = new Date();
      //   currentDate.setDate(currentDate.getDate() + i);
      //   this.someData.push({
      //     date: currentDate,
      //     value: Math.random(),
      //     group: currentDate.getMonth()
      //   });
      // }
      // this.timeScale = d3Scale.scaleTime()
      //   .domain(d3Array.extent(this.someData, (d) => {
      //     return d.date;
      //   }))
      //   .range([0, this.spiralLength]);
      //
      // // yScale for the bar height
      // this.yScale = d3Scale.scaleLinear()
      //   .domain([0, d3Array.max(this.someData, (d) => {
      //     return d.value;
      //   })])
      //   .range([0, (this.r / this.numSpirals) - 30]);
      //
      // this.svg.selectAll('rect')
      //   .data(this.someData)
      //   .enter()
      //   .append('rect')
      //   .attr('x', ( d, i ) => {
      //
      //     let linePer = this.timeScale(d.date),
      //       posOnLine = this.path.node().getPointAtLength(linePer),
      //       angleOnLine = this.path.node().getPointAtLength(linePer - this.barWidth);
      //
      //     d.linePer = linePer; // % distance are on the spiral
      //     d.x = posOnLine.x; // x postion on the spiral
      //     d.y = posOnLine.y; // y position on the spiral
      //
      //     d.a = (Math.atan2(angleOnLine.y, angleOnLine.x) * 180 / Math.PI) - 90;
      //
      //     return d.x;
      //   })
      //   .attr('y', (d) => {
      //     return d.y;
      //   })
      //   .attr('width', ( d ) => {
      //     return this.barWidth
      //   })
      //   .attr('height', (d) => {
      //     return this.yScale(d.value);
      //   })
      //   .style('fill', (d) => {
      //     return this.color(d.group);
      //   })
      //   .style('stroke', 'none')
      //   .attr('transform', (d) => {
      //     return 'rotate(' + d.a + ',' + d.x  + ',' + d.y + ')'; // rotate the bar
      //   });
      //
      // // add date labels
      // this.tF = d3TimeFormat.timeFormat('%b %Y');
      //
      // this.svg.selectAll('text')
      //   .data(this.someData)
      //   .enter()
      //   .append('text')
      //   .attr('dy', 10)
      //   .style('text-anchor', 'start')
      //   .style('font', '10px arial')
      //   .append('textPath')
      //   // only add for the first of each month
      //   .filter( (d) => {
      //     let sd = this.tF(
      //       d.date
      //     );
      //     if (!this.firstInMonth[sd]){
      //       this.firstInMonth[sd] = 1;
      //       return true;
      //     }
      //     return false;
      //   })
      //   .text( (d) => {
      //     return this.tF(d.date);
      //   })
      //   // place text along spiral
      //   .attr('xlink:href', '#spiral')
      //   .style('fill', 'grey')
      //   .attr('startOffset', (d) => {
      //     return ((d.linePer / this.spiralLength) * 100) + '%';
      //   });
      //
      // this.tooltip = d3.select( '.' + this.generateComponentDivClass() )
      //   .append('div')
      //   .attr('class', 'tooltip');
      //
      // this.tooltip.append('div')
      //   .attr('class', 'date');
      // this.tooltip.append('div')
      //   .attr('class', 'value');
      //
      // this.svg.selectAll('rect')
      //   .on('mouseover', (d) => {
      //
      //     this.tooltip.select('.date').html('Date: <b>' + d.date.toDateString() + '</b>');
      //     this.tooltip.select('.value').html('Value: <b>' + Math.round(d.value * 100 ) / 100 + '<b>');
      //
      //     d3.select(this)
      //       .style('fill','#FFFFFF')
      //       .style('stroke','#000000')
      //       .style('stroke-width','2px');
      //
      //     this.tooltip.style('display', 'block');
      //     this.tooltip.style('opacity',2);
      //
      //   })
      //   .on('mousemove', (d) => {
      //     this.tooltip.style('top', (d3.event.layerY + 10) + 'px')
      //       .style('left', (d3.event.layerX - 25) + 'px');
      //   })
      //   .on('mouseout', function(d) {
      //     d3.selectAll('rect')
      //       .style('fill', ( d ) => {
      //         return this.color(d.group);
      //       })
      //       .style('stroke', 'none')
      //
      //     this.tooltip.style('display', 'none');
      //     this.tooltip.style('opacity', 0);
      //   });

    }
  }

  generateComponentDivClass() {
    return 'spiralBarChart' + this.numberOfInitialisedComponent;
  }

  theta (r) {
    return this.numSpirals * Math.PI * r;
  };



}
