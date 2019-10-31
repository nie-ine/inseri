/**
 * This service generates an array filled with strings for the
 * first depth of the data chooser. When choosing an entry in the
 * first depth of the respective query, those strings are displayed instead
 * of the location number of the entry in the array.
 * */

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenerateArrayFromLeafsService {
  depth = 0;
  path = [];
  output = [];
  constructor() { }

  /**
   * This is a recursive function that iterates through the json which is the response
   * of a respective query.
   * After finding the correct depth in the json, the array of strings is returned.
   * */
  generateArrayFromLeafs(
    dataTree: any
  ) {
      // console.log( dataTree );
      let increment = 0;
      this.output = [];
      for ( const entry of dataTree ) {
        this.output.push( increment + ' ' + JSON.stringify( entry, null, 2 ) );
        increment += 1;
      }
      return this.output;
  }
}
