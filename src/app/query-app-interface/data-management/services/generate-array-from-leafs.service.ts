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
    path: any,
    depth: number
  ) {
    // console.log( dataTree, path );
    if ( path ) {
      if ( path && !isNaN( Number( path[ path.length - 1 ] ) ) ) {
        // console.log( 'Its a number, dont return anything' );
        return undefined;
      }
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
        // console.log( knot, dataTree[ knot ].length );
        if ( dataTree[ knot ] && dataTree[ knot ].length !== undefined && path.length > 1 ) {
          return this.goThroughArray( dataTree[ knot ] );
        } else if ( dataTree[ knot ] && dataTree[ knot ].length !== undefined && path.length === 1 ) {
          // console.log( dataTree, path );
          return [ dataTree[ path[ 0 ] ] ];
        } else if ( dataTree[ knot ] &&  !dataTree[ knot ].length ) {
          // console.log( dataTree[ knot ], dataTree[ knot ].length );
          const clonedPath = Object.assign([], path);
          const segment = clonedPath[ 0 ];
          clonedPath.splice(0, 1);
          return this.generateArrayFromLeafs( dataTree[ segment ], clonedPath, depth );
          // this.generateEntry( dataTree[ knot ], 1 );
          // return this.output;
        }
      }
    } else {
      let increment = 0;
      this.output = [];
      for ( const entry of dataTree ) {
        this.output.push( increment );
        increment += 1;
      }
      // console.log( this.output );
      return this.output;
    }
  }

  goThroughArray( subtree: any ) {
    // console.log( 'Go through array', subtree );
    this.depth += 1;
      for ( const arrayEntry of subtree ) {
         this.generateEntry( arrayEntry, this.depth );
      }
      // console.log( this.output );
      return this.output ;
  }

  generateEntry( subtree: any, depth: number ) {
    // console.log( this.path, subtree, depth, typeof subtree[ this.path[ depth ] ] );
    if ( typeof subtree[ this.path[ depth ] ] === 'string'  ) {
      // console.log( 'Push to data chooser entry' );
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
