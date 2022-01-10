/**
 * This service generates the path when a user clicks on
 * the hash of a tree node to map this path to the input.
 * */

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
    this.iterateThroughTree( tree, hash, undefined );
    return this.path;
  }

  iterateThroughTree( tree: any, hash: string, pathString: string ) {
    for ( const leaf in tree ) {
      if ( typeof tree[ leaf ] === 'object' && leaf !== 'path' ) {
        if ( tree[ leaf ].hash === hash ) {
          console.log( pathString );
          if ( pathString ) {
            pathString +=  ',' + leaf;
          } else {
            pathString = leaf;
          }
          const path = pathString.split(  ',' );
          console.log( path );
          this.path = path;
        } else {
          if ( pathString ) {
            this.iterateThroughTree( tree[ leaf ], hash, pathString + ',' + leaf );
          } else {
            this.iterateThroughTree( tree[ leaf ], hash, leaf );
          }
        }
      }
    }
  }
}
