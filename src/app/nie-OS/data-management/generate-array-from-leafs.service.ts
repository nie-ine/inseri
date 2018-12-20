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
    path: any
  ) {
    console.log( dataTree, path );
    this.path = path;
    this.depth = 0;
    this.output = [];
    if( path ) {
      for ( const knot of path ) {
        if ( dataTree[ knot ] && dataTree[ knot ].length !== undefined) {
          return this.goThroughArray( dataTree[ knot ] );
        }
      }
    }
  }

  goThroughArray( subtree: any ) {
    this.depth += 1;
      for ( const arrayEntry of subtree ) {
         this.generateEntry( arrayEntry, this.depth );
      }
      return this.output ;
  }

  generateEntry( subtree: any, depth: number ) {
    if ( this.path.length - 1 === depth ) {
      this.output.push( subtree[ this.path[ this.path.length - 1 ] ] );
    } else {
      this.generateEntry( subtree[ this.path[ depth ] ], depth + 1 );
    }
  }
}
