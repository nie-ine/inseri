import { Injectable } from '@angular/core';

/**
 * This service takes regions from knora and transforms them to SVG
 */
@Injectable()
export class RegionToSvgService {

  /**
   * Default written by angular-cli
   */
  constructor() { }

  /**
   * Create an element with the SVG vocabulary by input with comparable data.
   * @param region  Definition of a region by attributes, mappable to SVG.
   * @param maxSide  Information about the viewer to scale the regions.
   */
  static createSvgElement(region, maxSide) {

    if (region.type === 'polygon') {

      const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
      svgElement.id = 'roi-svgoverlay-' + Math.random() * 10000;
      let points = '';
      for (let j = 0; j < region.points.length; j++) {
        points += region.points[j].x;
        points += ',';
        points += region.points[j].y;
        points += ' ';
      }
      svgElement.setAttribute('points', points);
      svgElement.setAttribute('style', 'fill:' + region.lineColor + ';fill-opacity:0.2;stroke-width:' + region.lineWidth / maxSide + ';stroke:' + region.lineColor);

      return svgElement;

    } else if (region.type === 'rectangle') {

      const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      svgElement.id = 'roi-svgoverlay-' + Math.random() * 10000;
      svgElement.setAttribute('width', (region.points[1].x - region.points[0].x).toString());
      svgElement.setAttribute('height', (region.points[1].y - region.points[0].y).toString());
      svgElement.setAttribute('x', region.points[0].x);
      svgElement.setAttribute('y', region.points[0].y);
      svgElement.setAttribute('style', 'fill:' + region.lineColor + ';fill-opacity:0.2;stroke-width:' + region.lineWidth / maxSide + ';stroke:' + region.lineColor);

      return svgElement;

    } else if (region.type === 'circle') {

      const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      svgElement.id = 'roi-svgoverlay-' + Math.random() * 10000;
      svgElement.setAttribute('cx', region.points[0].x);
      svgElement.setAttribute('cy', region.points[0].y);
      svgElement.setAttribute('r',
        Math.sqrt(Math.pow(region.radius.x, 2) + Math.pow(region.radius.y, 2)).toString());
      svgElement.setAttribute('stroke', region.lineColor);
      svgElement.setAttribute('stroke-width', (region.lineWidth / maxSide).toString());
      svgElement.setAttribute('fill', region.lineColor);
      svgElement.setAttribute('style', 'fill-opacity:0.2;');


      return svgElement;

    } else {
      return document.createElementNS('http://www.w3.org/2000/svg', 'title');
    }
  }


}
