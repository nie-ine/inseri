import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneratePathService {
  path = [];
  constructor() { }

  generatePath( hash: string, tree: any ) {
    console.log( 'Generate Path for', hash, tree );
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
          this.iterateBack();
        } else {
          this.iterateThroughTree( tree[ leaf ], hash );
        }
      }
    }
  }

  iterateBack() {
    console.log( 'path:', this.path );
  }
}
