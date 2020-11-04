import {AfterViewChecked, Component, Input, OnInit} from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Sankey from 'd3-sankey';
import * as d3Scale from 'd3-scale';
import * as d3Format from 'd3-format';
import * as d3ScaleChromatic from 'd3-scale-chromatic';

@Component({
  selector: 'app-sankey',
  templateUrl: './sankey.component.html',
  styleUrls: ['./sankey.component.scss']
})
export class SankeyComponent implements AfterViewChecked {
  @Input() initialised = false;
  @Input() numberOfInitialisedComponent: number;
  @Input() data: any;
  alreadyInitialised = false;

  energy: DAG;

  constructor() { }

  ngAfterViewChecked() {
    if ( this.initialised && !this.alreadyInitialised && this.data ) {
      console.log( this.data );
      this.energy = this.data.data;
      this.alreadyInitialised = true;
      setTimeout(() => {
      this.DrawChart();
      }, 100);
    }
  }

  generateComponentDivClass() {
    return 'sankey' + this.numberOfInitialisedComponent;
  }

  DrawChart() {
    console.log('draw chart');
    let svg = d3.select('.' + this.generateComponentDivClass())
      .append('svg')
      .attr('width', 960) // Change here for size of the bars
      .attr('height', 500);

    let width = +svg.attr("width"),
      height = +svg.attr("height");

    let formatNumber = d3Format.format(",.0f"),
      format = function (d: any) { return formatNumber(d) + " TWh"; },
      color = d3Scale.scaleOrdinal(d3ScaleChromatic.schemeCategory10);

    let sankey = d3Sankey.sankey()
      .nodeWidth(15)
      .nodePadding(10)
      .extent([[1, 1], [width - 1, height - 6]]);

    let link = svg.append("g")
      .attr("class", "links")
      .attr("fill", "none")
      .attr("stroke", "#000")
      .attr("stroke-opacity", 0.2)
      .selectAll("path");

    let node = svg.append("g")
      .attr("class", "nodes")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .selectAll("g");

    sankey(this.energy);

    link = link
      .data(this.energy.links)
      .enter().append("path")
      .attr("d", d3Sankey.sankeyLinkHorizontal())
      .attr("stroke-width", function (d: any) { return Math.max(1, d.width); });

    link.append("title")
      .text(function (d: any) { return d.source.name + " â†’ " + d.target.name + "\n" + format(d.value); });

    node = node
      .data(this.energy.nodes)
      .enter().append("g");

    node.append("rect")
      .attr("x", function (d: any) { return d.x0; })
      .attr("y", function (d: any) { return d.y0; })
      .attr("height", function (d: any) { return d.y1 - d.y0; })
      .attr("width", function (d: any) { return d.x1 - d.x0; })
      .attr("fill", function (d: any) { return color(d.name.replace(/ .*/, "")); })
      .attr("stroke", "#000");

    node.append("text")
      .attr("x", function (d: any) { return d.x0 - 6; })
      .attr("y", function (d: any) { return (d.y1 + d.y0) / 2; })
      .attr("dy", "0.35em")
      .attr("text-anchor", "end")
      .text(function (d: any) { return d.name; })
      .filter(function (d: any) { return d.x0 < width / 2; })
      .attr("x", function (d: any) { return d.x1 + 6; })
      .attr("text-anchor", "start");

    node.append("title")
      .text(function (d: any) { return d.name + "\n" + format(d.value); });


  }


}

interface SNodeExtra {
  nodeId: number;
  name: string;
}

interface SLinkExtra {
  source: number;
  target: number;
  value: number;
  uom: string;
}
type SNode = d3Sankey.SankeyNode<SNodeExtra, SLinkExtra>;
type SLink = d3Sankey.SankeyLink<SNodeExtra, SLinkExtra>;

interface DAG {
  nodes: SNode[];
  links: SLink[];
}
