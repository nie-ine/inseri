import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneratePathService {
  path = [];
  tree: any;
  constructor() { }

  generatePath( hash: string, tree: any ) {
    console.log( 'Generate Path for', hash, tree );
    this.tree = tree;
    this.iterateThroughTree( tree, hash );
    console.log( tree );
    return hash;
  }

  iterateThroughTree( tree: any, hash: string ) {
    for ( const leaf in tree ) {
      if ( typeof tree[ leaf ] === 'object' && leaf !== 'path' ) {
        if ( tree[ leaf ].hash === hash ) {
          console.log( 'found hash', tree[ leaf ] );
          this.path = [];
          this.path.push( tree[ leaf ].parent, leaf );
          this.iterateBack( this.tree );
        } else {
          this.iterateThroughTree( tree[ leaf ], hash );
        }
      }
    }
  }

  iterateBack( tree: any ) {
    console.log( 'path:', this.path );
    if ( tree[ this.path[ 0 ] ] ) {
      console.log( 'path complete', this.path );
    } else {
      for ( const leaf in tree ) {
        if ( typeof tree[ leaf ] === 'object' && leaf !== 'path' ) {
          if ( tree[ leaf ][ this.path[ 0 ] ] ) {
            this.path.splice(0, 0, leaf );
            console.log( this.path );
          } else {
            this.iterateBack( tree[ leaf ] );
          }
        }
      }
    }
  }
}
