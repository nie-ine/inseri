import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneratePathService {
  path = [];
  tree: any;
  constructor() { }

  generatePath( hash: string, tree: any ) {
    console.log( hash, tree );
    this.tree = tree;
    this.iterateThroughTree( tree, hash );
    console.log( this.path );
    return this.path;
  }

  iterateThroughTree( tree: any, hash: string ) {
    for ( const leaf in tree ) {
      if ( typeof tree[ leaf ] === 'object' && leaf !== 'path' ) {
        if ( tree[ leaf ].hash === hash ) {
          // console.log( 'found hash', tree[ leaf ] );
          this.path = [];
          this.path.push( tree[ leaf ].parent, leaf );
           return this.iterateBack( this.tree, hash );
        } else {
          this.iterateThroughTree( tree[ leaf ], hash );
        }
      }
    }
  }

  iterateBack( tree: any, hash: string ) {
    // console.log( 'path:', this.path );
    if (
      this.checkIfPathExists( this.path, tree, 0 )
      // tree[ this.path[ 0 ] ] &&
      // ( !(this.path.length > 1) || tree[ this.path[ 0 ] ][ this.path[ 1 ] ] )
    ) {
      // console.log( 'path complete', this.path );
      return this.path;
    } else {
      for ( const leaf in tree ) {
        if ( typeof tree[ leaf ] === 'object' && leaf !== 'path' ) {
          if (
            // ( tree[ leaf ][ this.path[ 0 ] ] ) &&
            // ( !(this.path.length > 1) ||  tree[ leaf ][ this.path[ 0 ] ][ this.path[ 1 ] ] ) &&
            // ( !(this.path.length > 2) ||  tree[ leaf ][ this.path[ 0 ] ][ this.path[ 1 ] ][ this.path[ 2 ] ] )
            this.checkIfPathExists( this.path, tree[ leaf ], 0 )
          ) {
            this.path.splice(0, 0, leaf );
            this.iterateBack( this.tree, hash );
            // console.log( this.path );
          } else {
            this.iterateBack( tree[ leaf ], hash );
          }
        }
      }
    }
  }

  checkIfPathExists( path: any, subtree: any, depth: number ): boolean {
    if ( !(path.length > depth ) || subtree[ path[ depth ] ] ) {
      if ( path.length < depth ) {
        this.checkIfPathExists( path, subtree, depth + 1 );
      } else {
        return true;
      }
    } else {
      return false;
    }
  }
}
