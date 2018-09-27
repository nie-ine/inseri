/*
  Chord diagram in angular. Original in javascript by Mike Bostock https://bl.ocks.org/mbostock/4062006
 */

import { Component, Input, OnInit } from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Array from 'd3-array';
import * as d3Chord from 'd3-chord';
import * as d3Color from 'd3-color';
import * as d3Format from 'd3-format';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';

@Component({
  selector: 'app-chord-diagram',
  templateUrl: './chord-diagram.component.html',
  styleUrls: ['./chord-diagram.component.scss']
})
export class ChordDiagramComponent implements OnInit {

  @Input() initialised = false;
  @Input() numberOfInitialisedComponent: number;

  // square matrix. Number has to bee matched in colors variable below
  private matrix = [
    [11975,  5871, 8916, 2868],
    [ 1951, 10048, 2060, 6171],
    [ 8010, 16145, 8090, 8045],
    [ 1013,   990,  940, 6907]
  ];

  private colors = [ 'green', 'blue', 'orange', 'red' ];

  ngOnInit() {
    this.drawSvg();
  }

  drawSvg() {

    const svg = d3.select('svg');
    const width = svg.attr('width');
    const height = svg.attr('height');
    const outerRadius = Math.min(width, height) * 0.5 - 40;
    const innerRadius = outerRadius - 30;

    const formatValue = d3Format.formatPrefix(',.0', 1e3);

    const chord = d3Chord.chord()
      .padAngle(0.05)
      .sortSubgroups(d3Array.descending);

    const arc = d3Shape.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    const ribbon = d3Chord.ribbon()
      .radius(innerRadius);

    const color = d3Scale.scaleOrdinal()
      .domain(d3Array.range(4))
      .range(this.colors);

    const g = svg.append('g')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
      .datum(chord(this.matrix));

    const group = g.append('g')
      .attr('class', 'groups')
      .selectAll('g')
      .data(chords => {
        return chords.groups;
      })
      .enter().append('g');

    group.append('path')
      .style('fill', d => {
        return color(d.index);
      })
      .style('stroke', d => {
        return d3Color.color( color(d.index) ).darker();
      })
      .attr('d', arc);

    const groupTick = group.selectAll('.group-tick')
      .data(d => {
        return this.groupTicks(d, 1e3);
      })
      .enter().append('g')
      .attr('class', 'group-tick')
      .attr('transform', d => {
        return 'rotate(' + (d.angle * 180 / Math.PI - 90) + ') translate(' + outerRadius + ',0)';
      });

    groupTick.append('line')
      .attr('x2', 6);

    groupTick
      .filter(d => {
        return d.value % 5e3 === 0;
      })
      .append('text')
      .attr('x', 8)
      .attr('dy', '.35em')
      .attr('transform', d => {
        return d.angle > Math.PI ? 'rotate(180) translate(-16)' : null;
      })
      .style('text-anchor', d => {
        return d.angle > Math.PI ? 'end' : null;
      })
      .text(d => {
        return formatValue(d.value);
      });

    g.append('g')
      .attr('class', 'ribbons')
      .selectAll('path')
      .data(chords => {
        return chords;
      })
      .enter().append('path')
      .attr('d', ribbon)
      .style('fill', d => {
        return color(d.target.index);
      })
      .style('stroke', d => {
        return d3Color.color( color(d.target.index) ).darker();
      });
  }

  // Returns an array of tick angles and values for a given group and step.
  groupTicks(d, step) {
    const k = (d.endAngle - d.startAngle) / d.value;
    return d3Array.range(0, d.value, step).map(value => {
      return {value: value, angle: value * k + d.startAngle};
    });
  }

}
