import {HttpClient} from '@angular/common/http';
import {Action} from '../../shared/nieOS/mongodb/action/action.model';
import {Observable} from 'rxjs';

export class AbstractJsonService {
  leafIndices: any = {};
  abstractTree: any = {};
  layerIndex = -1;
  constructor(
  ) {}

  json2abstract( json: any ) {
    this.leafLoop( json, undefined );
    for( const leaf in this.leafIndices ) {
      if( this.abstractTree[ this.leafIndices[ leaf ].parent ] === undefined ) {
        this.abstractTree[ this.leafIndices[ leaf ].parent ] = [];
      }
      this.abstractTree[ this.leafIndices[ leaf ].parent ][ leaf ] = this.leafIndices[ leaf ] ;
      this.abstractTree[ this.leafIndices[ leaf ].parent ].layerIndex = this.leafIndices[ leaf ].layerIndex;
    }
    // console.log( this.abstractTree );
    for( const parent in this.abstractTree ) {
      if( this.abstractTree[ parent ].layerIndex === 1 ) {
        for( let childrenToTest in this.abstractTree[ parent ] ) {
          if( this.abstractTree[childrenToTest] ) {
            this.abstractTree[ parent ][childrenToTest] = this.abstractTree[childrenToTest];
          }
        }
      }
    }
    console.log( this.abstractTree );
    const help = this.abstractTree;
    this.abstractTree = {};
    for ( const parent in help) {
      if ( help[ parent ].layerIndex === 1 ) {
        this.abstractTree[ parent ] = {};
        this.goThroughChildren( help, parent, this.abstractTree[ parent ] );
      }
    }
    return this.abstractTree;
  }

  goThroughChildren( help: any, parent: any, tree: any ) {
    console.log( 'help', help, 'parent', parent, 'tree', tree );
    for ( const children in help[ parent ] ) {
      console.log( children, parent );
      tree[ children ] = help[ parent ][ children ];
      if ( help[ parent ][ children ].length !== undefined ) {
        console.log( '\n\n\n\nNext: convert to object from array\n\n\n' );
        this.goThroughChildren( help, children, tree[ children ] );
      }
    }
  }

  leafLoop ( leafLayer: any, parent: string ) {
    this.layerIndex += 1;
    for ( const leaf in leafLayer ) {
      if( typeof leafLayer[ leaf ] === 'object' && leafLayer[ leaf ] !== null ) {
        this.leafIndices[ leaf ] = {};
        this.leafIndices[ leaf ].type = 'array';
        this.leafIndices[ leaf ].layerIndex = this.layerIndex;
        this.leafIndices[ leaf ].parent = parent;
        this.arrayLoop( leafLayer[ leaf ], leaf);
      } else {
        this.leafIndices[ leaf ] = {};
        this.leafIndices[ leaf ].type = 'string';
        this.leafIndices[ leaf ].layerIndex = this.layerIndex;
        this.leafIndices[ leaf ].parent = parent;
      }
    }
    this.layerIndex -= 1;
  }

  arrayLoop ( arrayLayer: any, parent: string ) {
    for ( const entry of arrayLayer ) {
      if( entry[ 0 ] === undefined ) {
        this.leafLoop( entry, parent );
      }
    }
  }

}
