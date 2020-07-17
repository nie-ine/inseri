import {AfterViewChecked, Component, Input, OnInit} from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3ScaleChromatic from 'd3-scale-chromatic';
import * as d3Array from 'd3-array';
import * as d3Interpolate from 'd3-interpolate';


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
  x: number;
  y: number;

  private margin = {top: 20, right: 20, bottom: 30, left: 50};
  private width: number;
  private height: number;
  private radius: number;

  private pie: any;
  private svg: any;
  private _current: any;
  private chosenSection: any = {};
  private tooltip: any;

  constructor() {
    this.width = 900 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
    this.radius = Math.min(this.width, this.height) / 2;
    onmousemove = (e) => {
      this.x = e.clientX + 20;
      this.y = e.clientY - 20;
    };
  }

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
    const color = d3Scale.scaleOrdinal(d3ScaleChromatic.schemeRdYlGn[data.length]);

    this.svg = d3.select('.' + this.generateComponentDivClass('chart'))
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
    // define tooltip
    var tooltip = d3.select("#chart")
      .append("div")
      .attr("class", "tooltip");

    tooltip.append("div")
      .attr("class", "label");

    tooltip.append("div")
      .attr("class", "count");

    tooltip.append("div")
      .attr("class", "percent");

    for ( const entry of data ) {
      console.log( data );
      entry.value = +entry.value; // calculate count as we iterate through the data
      entry.enabled = true; // add enabled property to track which entries are checked
    }

    // creating the chart
    let path = this.svg.selectAll("path")
      .data(this.pie(data))
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => {
        return color(d.data.label);
      })
      .each((d) => {
        this._current - d;
      }); // creates a smooth animation for each track

    // mouse event handlers
    path.on("mouseover", (d, n, i) => {
      // calculate the total number
      const total = d3Array.sum(data.map((d) => {
        return (d.enabled) ? d.value : 0;
      }));
      const percent = Math.round(1000*d.data.value/total)/10;
      console.log( d.data.label, d.data.value, percent );

      this.chosenSection.label = d.data.label;
      this.chosenSection.value = d.data.value;
      this.chosenSection.percent = percent;

      tooltip.select(".label").html(d.data.label);
      tooltip.select(".count").html(d.data.value);
      tooltip.select(".percent").html(percent + "%");
      tooltip.style("display", "block");
    });

    path.on("mouseout", () => {
      tooltip.style("display", "none");
      this.chosenSection = {};
    });

    path.on("mousemove", (d) => {
      tooltip.style("top", (d3.event.layerY - 50) + "px") // always 50px above the cursor
        .style("left", (d3.event.layerX + 10) + "px"); // always 10px to the right of the mouse
    });

    const legend = this.svg.selectAll('.' + this.generateComponentDivClass( 'legend' ))
      .data(color.domain()) // refers to an array of labels from our data
      .enter()
      .append("g")
      .attr("class", "legend")
      .attr("transform", (d, i) => {
        var height = 25 + 6;
        var offset =  height * color.domain().length / 2;
        var horz = 12 * 25;
        var vert = i * height - offset;
        return "translate(" + horz + "," + vert + ")";
      });

    // adding colored squares to legend
    legend.append("rect")
      .attr("width", 25)
      .attr("height", 25)
      .style("fill", color)
      .style("stroke", color)
      .attr("cursor", "pointer")
      .on("click", (label, i, n) => {
        // console.log( this, n, i );
        // console.log( n[ i ] );
        var rect = d3.select( n[ i ] );
        var enabled = true; // set enabled true to default
        var totalEnabled = d3Array.sum(data.map((d) => { // can't disable all options
          return (d.enabled) ? 1 : 0; // return 1 for each enabled entry. and summing it up
        }));

        if (rect.attr("class") === "disabled") { // if class is disabled
          rect.attr("class", ""); // remove class disabled
        } else { // else
          if (totalEnabled < 2) return; // if less than two labels are flagged, exit
          rect.attr("class", "disabled"); // otherwise flag the square disabled
          enabled = false; // set enabled to false
        }

        this.pie.value((d: any)  => {
          if (d.label === label) d.enabled = enabled; // if entry label matches legend label
          return (d.enabled) ? d.value : 0; // update enabled property and return count or 0 based on the entry"s status
        });

        path = path.data(this.pie(data)); // update pie with new data

        path.transition() // transition of redrawn pie
          .duration(750) //
          .attrTween("d", (d) => { // "d" specifies the d attribute that we'll be animating
            var interpolate = d3Interpolate.interpolate(this._current, d); // this = current path element
            this._current = interpolate(0); // interpolate between current value and the new value of 'd'
            return (t) => {
              return arc(interpolate(t));
            };
          });
      });

    legend.append("text")
      .attr("x", 26 + 5)
      .attr("y", 25 - 6)
      .text((d) => {
        return d ; // return label
      });
  }


}
