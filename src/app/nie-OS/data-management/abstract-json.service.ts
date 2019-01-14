export class AbstractJsonService {
  leafIndices = new Set();
  abstractTree: any = {};
  layerIndex = -1;
  constructor(
  ) {}

  json2abstract( json: any ) {
    this.leafLoop( json, {}, undefined );

    console.log( this.abstractTree );
    return this.abstractTree;
  }

  leafLoop ( leafLayer: any, abstractTree: any, parent: string ) {
    for ( const leaf in leafLayer ) {
      if ( isNaN( +leaf ) ) {
        abstractTree[ leaf ] = {};
        abstractTree[ leaf ].type = typeof leafLayer[ leaf ];
        abstractTree[ leaf ].hash = this.generateHash();
        abstractTree[ leaf ].parent = parent;
        if ( typeof leafLayer[ leaf ] !== 'string' && leafLayer[ leaf ] !== null ) {
          for ( const entry of leafLayer[ leaf ] ) {
            this.leafLoop(
              entry,
              abstractTree[ leaf ],
              leaf
            );
          }
          for ( const subLeaf in leafLayer[ leaf ] ) {
            if ( isNaN( +subLeaf ) ) {
              console.log(Number(leaf));
              // console.log( leaf );
              const subLeafValue = leafLayer[leaf][subLeaf];
              // console.log( leaf, subLeafValue );
              if (typeof subLeafValue === 'string') {
                abstractTree[leaf][subLeaf] = {};
                abstractTree[leaf][subLeaf].type = typeof subLeafValue;
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

  generateHash(): string {
    // console.log('generate Hash');
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

