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
    if (
      this.checkIfPathExists( this.path, tree, 0 )
    ) {
      console.log( 'beginning:', this.path , tree);
      return this.path;
    } else {
      for ( const leaf in tree ) {
        if ( typeof tree[ leaf ] === 'object' && leaf !== 'path' ) {
          if (
            this.checkIfPathExists( this.path, tree[ leaf ], 0 )
          ) {
            console.log( this.path, tree[ leaf ] );
            this.path.splice(0, 0, leaf );
            this.iterateBack( this.tree, hash );
          } else {
            this.iterateBack( tree[ leaf ], hash );
          }
        }
      }
    }
  }

  checkIfPathExists( path: any, subtree: any, depth: number ): boolean {
    if (
      ( !(path.length > depth ) || subtree[ path[ depth ] ] )
    ) {
      if ( path.length < depth ) {
        this.checkIfPathExists( path, subtree, depth + 1 );
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  checkHashOfSubtree( tree: any, path: any, depth: number ) {
    if ( path.length > depth + 1 ) {
        this.checkHashOfSubtree( tree[ path[ depth ] ], path, depth + 1 );
    } else {
      if ( tree.hash === path.hash ) {
        return true;
      } else {
        return false;
      }
    }

  }
}
