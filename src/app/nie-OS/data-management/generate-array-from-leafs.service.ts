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
    let increment = 0;
    for ( const segment of path ) {
      if ( segment === null ) {
        path.splice( increment, 1 );
      }
      increment += 1;
    }
    this.path = path;
    this.depth = 0;
    this.output = [];
    if( path ) {
      for ( const knot of path ) {
        if ( dataTree[ knot ] && dataTree[ knot ].length !== undefined && path.length > 1 ) {
          return this.goThroughArray( dataTree[ knot ] );
        } else if ( dataTree[ knot ] && dataTree[ knot ].length !== undefined && path.length === 1 ) {
          console.log( dataTree, path );
          return [ dataTree[ path[ 0 ] ] ];
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
