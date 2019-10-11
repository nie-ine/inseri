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
    dataTree: any,
    path: any,
    depth: number
  ) {
    if ( path ) {
      if ( path && !isNaN( Number( path[ path.length - 1 ] ) ) ) {
        return undefined;
      }

      /**
       * The following loop was implemented as an intermediate fix.
       * Todo: check if paths with an empty segment still appear
       * */
      let increment = 0;
      for ( const segment of path ) {
        if ( segment === null ) {
          path.splice( increment, 1 );
        }
        increment += 1;
      }

      this.path = path;
      this.depth = depth;
      this.output = [];
      for ( const knot of path ) {
        if ( dataTree[ knot ] && dataTree[ knot ].length !== undefined && path.length > 1 ) {
          return this.goThroughArray( dataTree[ knot ] );
        } else if ( dataTree[ knot ] && dataTree[ knot ].length !== undefined && path.length === 1 ) {
          return [ dataTree[ path[ 0 ] ] ];
        } else if ( dataTree[ knot ] &&  !dataTree[ knot ].length ) {
          const clonedPath = Object.assign([], path);
          const segment = clonedPath[ 0 ];
          clonedPath.splice(0, 1);
          return this.generateArrayFromLeafs( dataTree[ segment ], clonedPath, depth );
        }
      }
    } else {
      let increment = 0;
      this.output = [];
      for ( const entry of dataTree ) {
        this.output.push( JSON.stringify(entry) );
        increment += 1;
      }
      return this.output;
    }
  }

  /**
   * This function goes through the array as part of the json
   * and returns the array for the data chooser
   * */
  goThroughArray( subtree: any ) {
    this.depth += 1;
      for ( const arrayEntry of subtree ) {
         this.generateEntry( arrayEntry, this.depth );
      }
      return this.output ;
  }

  /**
   * This recursive function is going through the children of the array
   * of the json to find the right string for the entry array of the data chooser
   * */
  generateEntry( subtree: any, depth: number ) {
    if ( subtree && typeof subtree[ this.path[ depth ] ] === 'string'  ) {
      this.output.push( subtree[ this.path[ depth ] ] );
    } else if ( this.path.length - 1 === depth && subtree ) {
      this.output.push( subtree[ this.path[ this.path.length - 1 ] ] );
    } else if ( subtree && !subtree[ 0 ] ) {
      this.generateEntry( subtree[ this.path[ depth ] ], depth + 1 );
    } else if ( subtree && subtree[ 0 ] ) {
      for ( let i = 0; i < subtree.length; i++ ) {
        this.generateEntry( subtree[ i ], depth );
      }
    }
  }
}
