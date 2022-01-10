import { AfterViewChecked, Component, Input } from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Array from 'd3-array';
import * as d3Chord from 'd3-chord';
import * as d3Color from 'd3-color';
import * as d3Scale from 'd3-scale';
import * as d3ScaleChromatic from 'd3-scale-chromatic';
import * as d3Shape from 'd3-shape';
import { CONNECTIONS } from './connections';

/**
 Chord diagram in angular for showing the intensity of letter exchange between people.
 Original in javascript by Mike Bostock https://bl.ocks.org/mbostock/4062006
 */
@Component({
  selector: 'app-chord-diagram',
  templateUrl: './chord-diagram.component.html',
  styleUrls: ['./chord-diagram.component.scss']
})
export class ChordDiagramComponent implements AfterViewChecked {

  /**
   * Variable for NIE-OS
   */
  @Input() initialised = false;

  /**
   * Variable for NIE-OS
   */
  @Input() numberOfInitialisedComponent: number;

  /**
   * Label/preposition for incoming connections "from".
   */
  @Input() fromLabel = 'von';

  /**
   * Label/preposition for outgoing connecitons "to".
   */
  @Input() toLabel = 'an';

  /**
   * Control over the initialization state of the component.
   */
  alreadyInitialised = false;

  /**
   * Title of the component
   */
  title = 'Chord Diagram';

  /**
   * The connections between source and target.
   */
  private dataMatrix;

  /**
   * Label for a row/column in the matrix.
   */
  private nameByIndex = {};

  /**
   * Index for a label in the matrix row.
   */
  private indexByName = {};

  /**
   * Root element for the image.
   */
  private svg;

  /**
   * Width of the image in pixels.
   */
  private width;

  /**
   * Height of the image in pixels.
   */
  private height;

  /**
   * Outer radius of the chord in pixels.
   */
  private outerRadius;

  /**
   * Inner radius of the chord in pixels.
   */
  private innerRadius;

  /**
   * The chord element that characterizes the component.
   */
  private chord;

  /**
   * Part of the circle that represents an entity in the chord diagram.
   */
  private arc;

  /**
   * A connection between a source and a target.
   */
  private ribbon;

  /**
   * Construct that assigns colors to entities in the chord diagram.
   */
  private color;

  /**
   * When the component has been drawn, initialize the SVG image.
   */
  ngAfterViewChecked() {
    if ( this.initialised && !this.alreadyInitialised ) {
      setTimeout(() => {
      this.alreadyInitialised = true;
      this.prepareData();
      this.initSvg();
      this.drawChord();
      }, 100);
    }
  }

  /**
   * Write the dataMatrix, indexByName, nameByIndex
   */
  prepareData() {
    this.dataMatrix = [];
    let n = 0;
    // Compute a unique index for each node.
    for (const d of CONNECTIONS) {
      if (this.indexByName[d.from] === undefined) {
        this.nameByIndex[n] = d.from;
        this.indexByName[d.from] = n;
        n++;
      }
      if (this.indexByName[d.to] === undefined) {
        this.nameByIndex[n] = d.to;
        this.indexByName[d.to] = n;
        n++;
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

    // Fill matrix with numbers
    for (const row of CONNECTIONS) {
      this.dataMatrix[this.indexByName[row.from]][this.indexByName[row.to]] = row.value;
    }
  }

  /**
   * NIE-OS specific
   */
  generateComponentDivClass() {
    return 'chord' + this.numberOfInitialisedComponent;
  }

  /**
   * Initialize variables for SVG image
   */
  initSvg() {
    this.svg = d3.select('.' + this.generateComponentDivClass())
      .append('svg')
      .attr('width', 600) // Change here for size of the bars
      .attr('height', 500);
    this.width = this.svg.attr('width');
    this.height = this.svg.attr('height');
    this.outerRadius = Math.min(this.width, this.height) * 0.5 - 40;
    this.innerRadius = this.outerRadius - 20;

    this.chord = d3Chord.chord()
      .padAngle(0.05)
      .sortSubgroups(d3Array.descending);

    this.arc = d3Shape.arc()
      .innerRadius(this.innerRadius)
      .outerRadius(this.outerRadius);

    this.ribbon = d3Chord.ribbon()
      .radius(this.innerRadius);

    this.color = d3Scale.scaleOrdinal(d3ScaleChromatic.schemeCategory10);
  }

  /**
   * Apply data to SVG image.
   */
  drawChord() {
    const g = this.svg.append('g')
      .attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')')
      .datum(this.chord(this.dataMatrix));

    const group = g.append('g')
      .attr('class', 'groups')
      .selectAll('g')
      .data(chords => {
        return chords.groups;
      })
      .enter().append('g');

    group.append('path')
      .style('fill', d => {
        return this.color(d.index);
      })
      .style('stroke', d => {
        return d3Color.color( this.color(d.index) ).darker();
      })
      .attr('d', this.arc)
      .append('svg:title')
      .text(d => {
        return this.formatArcTitle(d);
      });

    const groupTick = group.selectAll('.group-tick')
      .data(d => {
        return [ {angle: (d.endAngle + d.startAngle) / 2, index: d.index} ];
      })
      .enter().append('g')
      .attr('class', 'group-tick')
      .attr('transform', d => {
        return 'rotate(' + (d.angle * 180 / Math.PI - 90) + ') translate(' + this.outerRadius + ',0)';
      });

    groupTick
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
        return this.nameByIndex[d.index];
      });

    g.append('g')
      .attr('class', 'ribbons')
      .selectAll('path')
      .data(chords => {
        return chords;
      })
      .enter().append('path')
      .attr('d', this.ribbon)
      .style('fill', d => {
        return this.color(d.target.index);
      })
      .style('stroke', d => {
        return d3Color.color( this.color(d.target.index) ).darker();
      })
      .append('svg:title')
      .text(d => {
        return this.formatRibbonTitle(d);
      });
  }

  /**
   * Write the text for the mouseover explanation of a connection.
   * @param d  A bidirectional connection between source and target.
   */
  formatRibbonTitle(d) {
    return this.nameByIndex[d.source.index] + ' '
      + this.toLabel + ' '
      + this.nameByIndex[d.source.subindex] + ': '
      + d.source.value.toLocaleString() + '\n'
      + this.nameByIndex[d.target.index] + ' '
      + this.toLabel + ' '
      + this.nameByIndex[d.target.subindex] + ': '
      + d.target.value.toLocaleString();
  }

  /**
   * Write the text for the mouseover explanation of an entity in the chord diagram.
   * @param d  The data of the entity.
   */
  formatArcTitle(d) {
    return this.fromLabel + ' '
      + this.nameByIndex[d.index] + ': '
      + d.value.toLocaleString();
  }
}
