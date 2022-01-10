import { Injectable } from "@angular/core";
/**
 * This service generates an abstract representation of a json.
 * The json that is returned by this function is the abstrac representation
 * of the input json which is the response of a query.
 * */

@Injectable()
export class AbstractJsonService {
  leafIndices = new Set();
  abstractTree: any = {};
  layerIndex = -1;
  constructor(
  ) {}

  json2abstract( json: any ) {
    console.log( json );
    if ( json.length > 0 ) {
      for (const entry of json) {
        this.leafLoop(
          entry,
          {},
          undefined
        );
      }
    } else {
      this.leafLoop( json, {}, undefined );
    }
    return this.abstractTree;
  }

  /**
   * This is a recursive function.
   * @input leaflayer: the currently treated json
   * @input abstractTree: abstract representation of the input json of the function json2Abstract
   * @input parent: parent of the respective leaf
   * */
  leafLoop ( leafLayer: any, abstractTree: any, parent: string ) {
    for ( const leaf in leafLayer ) {
      if ( isNaN( +leaf ) ) {                                                               // if the leaf is not a number
        abstractTree[ leaf ] = {};
        abstractTree[ leaf ].type = typeof leafLayer[ leaf ];
        abstractTree[ leaf ].hash = this.generateHash();
        abstractTree[ leaf ].parent = parent;
        console.log( leafLayer[ leaf ], Object.keys(leafLayer[ leaf ]).length );
        if (
          typeof leafLayer[ leaf ] !== 'string' &&
          typeof leafLayer[ leaf ] !== 'number' &&
          leafLayer[ leaf ] !== null &&
          ( leafLayer[ leaf ].length !== undefined || Object.keys(leafLayer[ leaf ]).length > 0 )
        ) {
          console.log( leafLayer[ leaf ] );
          if ( leafLayer[ leaf ].length !== undefined ) {
            for ( const entry of leafLayer[ leaf ] ) {
              this.leafLoop(
                entry,
                abstractTree[ leaf ],
                leaf
              );
            }
          }
          for ( const subLeaf in leafLayer[ leaf ] ) {
            if ( isNaN( +subLeaf ) ) {                                                       // if the leaf is not a number
              const subLeafValue = leafLayer[leaf][subLeaf];
              if (typeof subLeafValue === 'string') {
                abstractTree[ leaf ][ subLeaf ] = {};
                abstractTree[ leaf ][ subLeaf ].type = typeof subLeafValue;
                abstractTree[ leaf ][ subLeaf ].hash = this.generateHash();
                abstractTree[ leaf ][ subLeaf ].parent = leaf;
              } else {
                this.leafLoop(
                  leafLayer[leaf],
                  abstractTree[leaf],
                  leaf
                );
              }
            }
          }
        }
      }
    }
    this.abstractTree = abstractTree;
  }

  /**
   * This service generates a random 5 digit long hash needed to identify
   * the individual leaf of the abstract tree
   * */
  generateHash(): string {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) {
      text += possible.charAt(
        Math.floor(Math.random() * possible.length )
      );
    }
    return text;
  }
}
