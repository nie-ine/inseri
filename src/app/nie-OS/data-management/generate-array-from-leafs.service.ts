import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenerateArrayFromLeafsService {
  depth = 0;
  path = [ 'projects', 'shortname' ];
  output = [];
  constructor() { }

  generateArrayFromLeafs(
    dataTree: any,
    abstractTree: any,
    leafIndex: any
  ) {
    console.log( 'Generate Array from Leafs', dataTree, abstractTree, leafIndex );
    console.log( 'Iterate through abstracTree to find index' );
    console.log( 'Iterate through data tree to push in array' );
    console.log( dataTree );
    for ( const knot of this.path ) {
      console.log( knot );
      if ( dataTree[ knot ] && dataTree[ knot ].length !== undefined) {
        return this.goThroughArray( dataTree[ knot ] );
      }
    }
  }

  goThroughArray( subtree: any ) {
    this.depth += 1;
    if ( this.path.length === this.depth + 1 ) {
      console.log( 'Push entry to output array' );
      for ( const arrayEntry of subtree ) {
        console.log( arrayEntry[ this.path[ this.depth ] ] );
        this.output.push( arrayEntry[ this.path[ this.depth ] ] );
      }
      return this.output ;
    }

  }
}
