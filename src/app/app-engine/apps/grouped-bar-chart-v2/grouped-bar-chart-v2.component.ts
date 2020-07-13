import {AfterViewChecked, Component, Input, OnInit} from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3ScaleChromatic from 'd3-scale-chromatic';


@Component({
  selector: 'app-grouped-bar-chart-v2',
  templateUrl: './grouped-bar-chart-v2.component.html',
  styleUrls: ['./grouped-bar-chart-v2.component.scss']
})
export class GroupedBarChartV2Component implements AfterViewChecked {
  @Input() initialised = false;
  @Input() numberOfInitialisedComponent: number;
  @Input() data: any;
  alreadyInitialised = false;
  constructor() { }

  generateComponentDivClass( name: string ) {
    return name + this.numberOfInitialisedComponent;
  }

  ngAfterViewChecked() {
    // console.log( this.numberOfInitialisedComponent, this.data );
    if (
      this.initialised &&
      !this.alreadyInitialised &&
      this.data ) {
      this.alreadyInitialised = true;
      setTimeout(() => {
        console.log( this.data );
        this.drawD3( this.data.data );
      }, 100);
    }
  }

  drawD3( data: Array<any> ) {
    console.log( data );

    const color = d3Scale.scaleOrdinal(d3ScaleChromatic.schemeRdYlGn[data.length]);

    // svg chart dimensions
    const width = +d3.select("#chart").attr("width");
    const height = +d3.select("#chart").attr("height");

    // margins
    const margin = {
      top: 20,
      right: 20,
      bottom: 30,
      left: 40
    };

    // getting all the key names (["1851 and after", ...])
    const keys = Object.keys(data[0]).slice(1);

    // size of the legend squares
    const legendRectSize = 25;
    // spacing between legend squares
    const legendSpacing = 6;

    // selecting the #chart
    const svg = d3.select("#chart")
      .append("svg") // appending an <svg> element
      .attr("width", width + margin.left + margin.right) // setting its width
      .attr("height", height + margin.top + margin.bottom) // setting its height
      .append("g") // appending a <g> element to the <svg> element
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")"); // translate algon x-axis and y-axis

    // selecting the #chart
    const svg2 = d3.select("#legend")
      .append("svg") // appending an <svg> element
      .attr("width", +d3.select("#legend").attr("width") + margin.left + margin.right) // setting its width
      .attr("height", +d3.select("#legend").attr("height") + margin.top + margin.bottom) // setting its height
      .append("g") // appending a <g> element to the <svg> element
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")"); // translate algon x-axis and y-axis

    // scale for the x-axis (spacing the groups)
    const x0 = d3Scale.scaleBand()
      .domain(data.map((d) => {
        return d.label; //
      })) // returns array of all the labels for the x-axis (["Verse 1", "Verse 2", ...])
      .range([0, width])
      .paddingInner(0.1)
      .paddingOuter(0.5)
      .align(0.0);

    // scale for the bars per above given group (spacing each group's bars)
    const x1 = d3Scale.scaleBand()
      .domain(keys)
      .range([0, x0.bandwidth()]) // max width is the width of a group
      .paddingInner(0);

    // scale for the y-axis
    const y = d3Scale.scaleLinear()
      .domain([0, d3Array.max(data, (d) => {
        return d3Array.max(keys, (key) => {
          return d[key]; // returns the highest of all values
        });
      })])
      .range([height, 0])
      .nice(); // nicing the scale (ending on round values)

    svg.append("g")
      .selectAll("g")
      .data(data)
      .enter()
      .append("g")
      .attr("class","bar")
      .attr("transform", (d) => {
        return "translate(" + x0(d.label) + ",0)"; // x0(d.label) => getting the corresponding range for the domain value
      })
      .selectAll("rect")
      .data((d) => {
        return keys.map((key) => {
          return {key: key, value: d[key]};
        });
      })
      .enter()
      .append("rect")
      .attr("class", "barPart")
      .attr("x", (d) => {
        return x1(d.key);
      })
      .attr("y", (d) => {
        return y(d.value);
      })
      .attr("width", x1.bandwidth())
      .attr("height", (d) => {
        return height - y(d.value);
      })
      .attr("fill", (d) => {
        return color(d.key);
      });

  }

}
