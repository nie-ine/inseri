import {AfterViewChecked, Component, Input, OnInit} from '@angular/core';
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
  @Input() initialised = false;
  @Input() numberOfInitialisedComponent: number;
  @Input() data: any;
  private x: number;
  private y: number;
  alreadyInitialised = false;
  mouseOverData: any = {};
  lengthOfArray = 60000;
  width: number;
  svg: any; svg2: any; legend: any;
  constructor() {
  }

  generateComponentDivClass( name: string ) {
    return name + this.numberOfInitialisedComponent;
  }

  ngAfterViewChecked() {
    // console.log( this.numberOfInitialisedComponent, this.data );
    if (
      this.initialised &&
      !this.alreadyInitialised &&
      this.data && this.data.data ) {
      this.alreadyInitialised = true;
      setTimeout(() => {
        console.log( this.data );
        this.drawD3( this.data.data );
      }, 500);
    }
  }

  drawD3( data: Array<any>, width?: number ) {

    this.svg = undefined;
    this.svg2 = undefined;
    this.legend = undefined;

    this.lengthOfArray = data.length;

    const keys = Object.keys(data[0]).slice(1);

    const color = d3Scale.scaleOrdinal(d3ScaleChromatic.schemeRdYlGn[keys.length]);

    // svg chart dimensions

    this.width = width !== undefined ? width : data.length * 100;

    const height = +d3.select('.' + this.generateComponentDivClass( 'groupedBarChart' )).attr("height");

    // margins
    const margin = {
      top: 20,
      right: 20,
      bottom: 30,
      left: 40
    };

    // getting all the key names (["1851 and after", ...])

    // size of the legend squares
    const legendRectSize = 25;
    // spacing between legend squares
    const legendSpacing = 6;

    // selecting the #chart
    this.svg = d3.select('.' + this.generateComponentDivClass( 'groupedBarChart' ))
      .append("svg") // appending an <svg> element
      .attr("width", this.width + margin.left + margin.right) // setting its width
      .attr("height", height + margin.top + margin.bottom) // setting its height
      .append("g") // appending a <g> element to the <svg> element
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")"); // translate algon x-axis and y-axis

    // selecting the #chart
    this.svg2 = d3.select( '.' + this.generateComponentDivClass( 'groupedBarChartlegend' ) )
      .append("svg") // appending an <svg> element
      .attr("width", +d3.select('.' + this.generateComponentDivClass( 'groupedBarChartlegend' ))
        .attr("width") + margin.left + margin.right) // setting its width
      .attr("height", +d3.select('.' + this.generateComponentDivClass( 'groupedBarChartlegend' ))
        .attr("height") + margin.top + margin.bottom) // setting its height
      .append("g") // appending a <g> element to the <svg> element
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")"); // translate algon x-axis and y-axis

    // scale for the x-axis (spacing the groups)
    const x0 = d3Scale.scaleBand()
      .domain(data.map((d) => {
        return d.label; //
      })) // returns array of all the labels for the x-axis (["Verse 1", "Verse 2", ...])
      .range([0, this.width])
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

    this.svg.append("g")
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

    this.svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3Axis.axisBottom(x0));

    this.svg.append("g")
      .attr("class", "y axis")
      .call(d3Axis.axisLeft(y).ticks(null, "s"))
      .append("text")
      .attr("x", 10)
      .attr("y", y(y.ticks().pop()))
      .attr("dy", "0.32em")
      .attr("fill", "black")
      .attr("font-weight", "bold")
      .attr("text-anchor", "start")
      .text("Number of citations");

    // define tooltip
    var tooltip = d3.select('.' + this.generateComponentDivClass( 'groupedBarChart' ))
      .append("div")
      .attr("class", "tooltip");

    tooltip.append("div")
      .attr("class", "label");

    tooltip.append("div")
      .attr("class", "count");

    // Confused?:

    // <div id="chart">
    //   <div class="tooltip">
    //     <div class="label">
    //     </div>
    //     <div class="count">
    //     </div>
    //   </div>
    // </div>

    var barPart = this.svg.selectAll(".barPart");

    barPart.on("mouseover", (d) => {
      tooltip.select(".label").html(d.key);
      tooltip.select(".count").html(d.value);
      // console.log( d.key, d.value );
      this.mouseOverData.key = d.key;
      this.mouseOverData.value = d.value;
      tooltip.style("display", "block");
      onmousemove = (e) => {
        this.x = e.clientX + 20;
        this.y = e.clientY - 20;
      };
    });

    barPart.on("mouseout", () => {
      this.mouseOverData = {};
      tooltip.style("display", "none");
    });

    barPart.on("mousemove", (d) => {
      tooltip.style("top", (d3.event.layerY - 50) + "px") // always 10px below the cursor
        .style("left", (d3.event.layerX + 10) + "px"); // always 10px to the right of the mouse
    });

    this.legend = this.svg2.append("g")
      //.attr("text-anchor", "end")
      .selectAll("g")
      .data(keys.slice())
      .enter()
      .append("g")
      .attr("transform", (d, i) => {
        var height = legendRectSize + legendSpacing;
        var vert = i * height;
        return "translate(" + -120 + "," + vert + ")";
      });

    this.legend.append("rect")
      .attr("x", 150)
      .attr("width", legendRectSize)
      .attr("height", legendRectSize)
      .attr("fill", color)
      .attr("stroke", color)
      .attr("stroke-width",2)
      .attr("cursor", "pointer")
      .on("click",(d) => {
        update(d)
      });

    this.legend.append("text")
      .attr("x", 200)
      .attr("y", legendRectSize - legendSpacing)
      .text((d) => {
        return d;
      });

    let filtered = [];

    function update(d) {
      // update the array to filter the chart by:

      // add the clicked key if not included:
      if (filtered.indexOf(d) == -1) {
        filtered.push(d);
        // if all bars are un-checked, reset:
        if(filtered.length == keys.length) filtered = [];
      }
      // otherwise remove it:
      else {
        filtered.splice(filtered.indexOf(d), 1);
      }

      // update the scales for each group(/states)'s items:
      var newKeys = [];
      keys.forEach(function(d) {
        if (filtered.indexOf(d) == -1 ) {
          newKeys.push(d);
        }
      })
      x1.domain(newKeys).rangeRound([0, x0.bandwidth()]);
      y.domain([0, d3Array.max(data, function(d) {
        return d3Array.max(keys, function(key) {
          if (filtered.indexOf(key) == -1) return d[key];
        });
      })]).nice();

      // update the y axis:
      this.svg.select(".y")
        .transition()
        .call(d3Axis.axisLeft(y).ticks(null, "s"))
        .duration(500);

      // filter out the bands that need to be hidden:
      var bars = this.svg.selectAll(".bar").selectAll("rect")
        .data(function(d) {
          return keys.map(function(key) {
            return {key: key, value: d[key]};
          });
        })

      bars.filter(function(d) {
        return filtered.indexOf(d.key) > -1;
      })
        .transition()
        .attr("x", function(d) {
          return (+d3.select(this).attr("x")) + (+d3.select(this).attr("width"))/2;
        })
        .attr("height",0)
        .attr("width",0)
        .attr("y", function(d) {
          return height;
        })
        .duration(500);

      // adjust the remaining bars:
      bars.filter(function(d) {
        return filtered.indexOf(d.key) == -1;
      })
        .transition()
        .attr("x", function(d) {
          return x1(d.key);
        })
        .attr("y", function(d) {
          return y(d.value);
        })
        .attr("height", function(d) {
          return height - y(d.value);
        })
        .attr("width", x1.bandwidth())
        .attr("fill", function(d) {
          return color(d.key);
        })
        .duration(500);

      // update legend:
      this.legend.selectAll("rect")
        .transition()
        .attr("fill",function(d) {
          if (filtered.length) {
            if (filtered.indexOf(d) == -1) {
              return color(d);
            }
            else {
              return "white";
            }
          }
          else {
            return color(d);
          }
        })
        .duration(100);
    }

  }



}
