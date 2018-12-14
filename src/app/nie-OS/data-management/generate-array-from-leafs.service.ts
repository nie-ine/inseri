import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenerateArrayFromLeafsService {
  depth = 0;
  path = [];
  output = [];
  constructor() { }

  generateArrayFromLeafs(
    dataTree: any,
    abstractTree: any,
    path: any
  ) {
    this.path = path;
    for ( const knot of path ) {
      if ( dataTree[ knot ] && dataTree[ knot ].length !== undefined) {
        return this.goThroughArray( dataTree[ knot ] );
      }
    }
  }

  goThroughArray( subtree: any ) {
    this.depth += 1;
    if ( this.path.length === this.depth + 1 ) {
      for ( const arrayEntry of subtree ) {
        this.output.push( arrayEntry[ this.path[ this.depth ] ] );
      }
      return this.output ;
    }

  }
}
