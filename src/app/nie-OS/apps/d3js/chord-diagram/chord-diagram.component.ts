import { Component, Input, OnInit } from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3ScaleChromatic from 'd3-scale-chromatic';
import * as d3Shape from 'd3-shape';
import * as d3Chord from 'd3-chord';

import { CONNECTIONS } from './connections';


@Component({
  selector: 'app-chord-diagram',
  templateUrl: './chord-diagram.component.html',
  styleUrls: ['./chord-diagram.component.scss']
})
export class ChordDiagramComponent implements OnInit {

  @Input() initialised = false;
  @Input() numberOfInitialisedComponent: number;

  private dataMatrix;

  private nameByIndex = {};
  private indexByName = {};

  private outerRadius = 960 / 2;
  private innerRadius = this.outerRadius - 130;

  private fill;

  private chord;
  private arc_layout;
  private svg;

  constructor() { }

  ngOnInit() {
    this.prepareData();
    this.initSvg();
    this.drawChord();
  }

  prepareData() {

    this.dataMatrix = [];
    let n = 0;

    // Compute a unique index for each package name.
    for (const d of CONNECTIONS) {
      if (!this.indexByName[d.name]) {
        this.nameByIndex[n] = d.name;
        this.indexByName[d.name] = n;
        n++;
      }
      for (const e of d.imports) {
        if (!this.indexByName[e]) {
          this.nameByIndex[n] = e;
          this.indexByName[e] = n;
          n++;
        }
      }
    }

    // make empty matrix
    for (const xContent in this.indexByName) {
      const xDim = [];
      for (const yContent in this.indexByName) {
        xDim.push(0);
      }
      this.dataMatrix.push(xDim);
    }

    // Construct a square matrix counting package imports.
    for (const subject of CONNECTIONS) {
      const source = this.indexByName[subject.name];
      let row = this.dataMatrix[source];
      if (!row) {
        let row = this.dataMatrix[source] = [];
        for (let i = -1; ++i < n;) {
          row[ i ] = 0;
        }
      }
      for (const object of subject.imports) {
        row[this.indexByName[object]]++;
      }
    }
  }

  initSvg() {

    // initialize svg to attach diagram
    this.svg = d3.select('.myChord')
      .append('svg')
      .attr('width', this.outerRadius * 2)
      .attr('height', this.outerRadius * 2)
      .append('g')
      .attr('transform', 'translate(' + this.outerRadius + ',' + this.outerRadius + ')');

    // initialize chord
    // this.chord.matrix(matrix);
    this.chord = d3Chord.chord()
      .padAngle(.04);
     // .sortSubgroups(d3.descending)
     // .sortChords(d3.descending);

    // layout for segments
    this.arc_layout = d3Shape.arc()
      .innerRadius(this.innerRadius)
      .outerRadius(this.innerRadius + 20);

    // color for segments
    this.fill = d3Scale.scaleOrdinal(d3ScaleChromatic.schemeCategory10);
  }

  drawChord() {

    // TODO: selectAll...data...enter does not work

    const g = this.svg.selectAll('.group')
      .data(this.chord.groups)
      .enter().append('g')
      .attr('class', 'group');

    // subject segment
    g.append('path')
      .style('fill', (d) => {
        return this.fill(d.index);
      })
      .style('stroke', (d) => {
        return this.fill(d.index);
      })
      .attr('d', this.arc_layout);

    // names on diagram
    g.append('text')
      .each((d) => { d.angle = (d.startAngle + d.endAngle) / 2; })
      .attr('dy', '.35em')
      .attr('transform', (d) => {
        return 'rotate(' + (d.angle * 180 / Math.PI - 90) + ')'
          + 'translate(' + (this.innerRadius + 26) + ')'
          + (d.angle > Math.PI ? 'rotate(180)' : '');
      })
      .style('text-anchor', function(d) {
        return d.angle > Math.PI ? 'end' : null;
      })
      .text((d) => {
        return this.nameByIndex[d.index];
      });

    // connections
    this.svg.selectAll('.chord')
      .data(this.chord.chords)
      .enter().append('path')
      .attr('class', 'chord')
      .style('stroke', d => {
        return 'ffffff';
        // return d3.rgb(this.fill(d.source.index)).darker();
      })
      .style('fill', d => {
        return this.fill(d.source.index);
      })
      .attr('d', d3Chord().radius(this.innerRadius));

    d3.select(self.frameElement).style('height', this.outerRadius * 2 + 'px');

  }
}
