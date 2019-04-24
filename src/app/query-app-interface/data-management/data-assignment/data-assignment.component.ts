import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-data-assignment',
  templateUrl: './data-assignment.component.html'
})
export class DataAssignmentComponent implements OnChanges {
  @Input() index: number;
  @Input() openAppsInThisPage: any;
  @Input() appInputQueryMapping: any;
  @Input() response: any;
  @Input() queryId;
  @Input() updateLinkedApps = false;
  @Input() indexAppMapping: any;
  @Input() depth: number;
  @Output() sendAppTypesBackToNIEOS: EventEmitter<any> = new EventEmitter<any>();
  arrayIndicator: Array<any> = [];
  currentIndex: any = {};
  firstChange = true;
  changes: any;
  constructor() { }

  ngOnChanges( changes: SimpleChanges) {
    console.log( changes );
    this.firstChange = true;
    this.startPathUpdateProcess();
    this.checkIfPathContainsScalarAsLastEntry();
    if ( this.updateLinkedApps === true ) {
      this.updateLinkedAppsMethod();
    }
  }

  startPathUpdateProcess() {
    if ( !this.currentIndex ) {
      this.currentIndex = {};
    }
    if ( !this.currentIndex[ this.queryId ] ) {
      this.currentIndex[ this.queryId ] = {};
    }
    this.currentIndex[ this.queryId ][ this.depth ] = this.index;
    // console.log( this.appInputQueryMapping );
    for ( const appHash in this.appInputQueryMapping ) {
      for ( const inputName in this.appInputQueryMapping[ appHash ] ) {
        if ( this.appInputQueryMapping[ appHash ][ inputName ].query === this.queryId ) {
          // console.log( this.appInputQueryMapping[ appHash ][ inputName ].path );
          this.updatePathWithIndices(
            this.appInputQueryMapping[ appHash ][ inputName ].path,
            this.response,
            this.currentIndex[ this.queryId ],
            0,
            0
          );
        }
      }
    }
    this.goThroughAppInputs();
  }

  updatePathWithIndices(
    path: Array<string>,
    response: any,
    currentIndex: any,
    indexDepth: number,
    pathDepth: number
  ) {
    let deleteCount = 0;
    // console.log( path[ pathDepth ] );
    // if ( ( path[ pathDepth ] === 'text-editing:hasDiplomaticTranscriptionValue' ) ) {
    //   console.log( indexDepth, this.depth, path[ pathDepth ], response );
    // }
    if (
      response &&
      response[ path[ pathDepth ] ] &&
      response[ path[ pathDepth ] ].length > 0
    ) {
      // console.log( path[ pathDepth ] );
        if ( indexDepth === this.depth ) {
          if ( !isNaN( Number( path[ pathDepth + 1 ] ) ) ) {
            deleteCount = 1;
          }
          // console.log( pathDepth, path.length );
          if ( pathDepth + 1 !== path.length ) {
            path.splice(pathDepth + 1, deleteCount, currentIndex[ indexDepth ]);
          }
        }
        indexDepth += 1;
        // console.log( path );
      }
    if ( path.length > pathDepth + 1 && response ) {
      this.updatePathWithIndices(
        path,
        response[ path[ pathDepth ] ],
        currentIndex,
        indexDepth,
        pathDepth + 1
      );
    }
  }

  checkIfPathContainsScalarAsLastEntry() {
    setTimeout(() => {
      if (
        this.openAppsInThisPage[ 'dataChooser' ].model &&
        this.openAppsInThisPage[ 'dataChooser' ].model.length > 0 && this.firstChange
      ) {
        this.firstChange = false;
        for ( const appHash in this.appInputQueryMapping ) {
          for ( const inputName in this.appInputQueryMapping[ appHash ] ) {
            const path = this.appInputQueryMapping[ appHash ][ inputName ].path;
            if ( path && !isNaN( Number ( path[ path.length - 1 ] ) ) ) {
              for ( const dataChooser of this.openAppsInThisPage[ 'dataChooser' ].model ) {
                // console.log('Go through app input');
                this.goThroughAppInputs(
                  dataChooser.response,
                  dataChooser.queryId
                );
              }
            }
          }
        }
      } else {
        this.checkIfPathContainsScalarAsLastEntry();
      }
    }, 1000);
  }

  /**
   * This method assigns data chosen by the data chooser. If parts of the json are arrays,
   * this method assigns the depth = 0 to array coming after the first array where the depth is chosen by the
   * data chooser
   * */
  goThroughAppInputs( response?: any, queryId?: string ) {
    for ( const type in this.openAppsInThisPage ) {
      if (  this.openAppsInThisPage[ type ].model.length && type !== 'dataChooser' ) {
        for ( const app of this.openAppsInThisPage[ type ].model ) {
          if ( this.appInputQueryMapping[ app.hash ] ) {
            for ( const input in this.appInputQueryMapping[ app.hash ] ) {
              // console.log( 'hier', this.queryId, queryId );
              if ( this.appInputQueryMapping[ app.hash ][ input ][ 'query' ] === (this.queryId || queryId ) ) {
                let increment = 0;
                for ( const segment of this.appInputQueryMapping[ app.hash ][ input ][ 'path' ] ) {
                  if ( segment === null ) {
                    this.appInputQueryMapping[ app.hash ][ input ][ 'path' ].splice( increment, 1 );
                  }
                  increment += 1;
                }
                  app[ input ] = this.generateAppinput(
                    this.response || response,
                    this.appInputQueryMapping[ app.hash ][ input ][ 'path' ],
                    this.index,
                    0,
                    true,
                    app
                  );
              }
            }
          }
        }
      }
    }
  }

  generateAppinput(
    response: any,
    path: any,
    index: number,
    depth: number,
    firstArray: boolean,
    app: any
  ) {
    // console.log( app, path, index, response );
    if ( response ) {
        if ( path[ 0 ] === 'wholeJsonResponseAssignedToThisAppInput' ) {
          return response;
        }
        if ( path.length === 1 ) {
          return response[ path[ 0 ] ];
        } else if ( response.length  ) {                                          // Response is an array
          // console.log( path, depth, path[ depth ] );
          if ( !isNaN( path[ depth ] ) ) {
            return this.generateAppinput(
              response[ path[ depth ] ],
              path,
              index,
              depth + 1,
              false,
              app
            );
          }
          if (
            depth === path.length - 1  &&
            !isNaN( Number ( path[ path.length - 1 ] ) )
          ) {
            console.log( response[ Number ( path[ depth ] ) ], app );
            return response[ Number ( path[ depth ] ) ];
          }
          if ( typeof response === 'string' ) {
            return response;
          } else {
            if ( firstArray ) {
              return this.generateAppinput(
                response[ index ],
                path,
                index,
                depth + 1,
                false,
                app
              );
            } else {
              return this.generateArrayInput(
                response,
                path,
                index,
                depth,
                false,
                app
              );
            }
          }
        } else if ( depth !== path.length && response[ path[ depth ] ] ) {        // Response is not an array
          console.log( 'Response is not an array', response[ path[ depth ] ], depth, path.length );
          if ( response[ path[ depth + 1 ] ] === undefined && depth === path.length - 1 ) {
            return response[ path[ depth ] ];
          } else {
            console.log( 'here1', response[ path[ depth ] ], path[ depth ] );
            return this.generateAppinput(
              response[ path[ depth ] ],
              path,
              index,
              depth + 1,
              firstArray,
              app
            );
          }
        } else if ( depth === path.length ) {
          // console.log( response );
          return response[ path[ depth - 1 ] ];
        } else if ( path.length - 1 === depth && Number( path[ depth ] ) ) {
          return response[ path[ depth - 1 ] ][ Number( path[ depth ] ) ];
        } else {
          console.log( 'here2', response, path[ depth ], response[ path[ depth ] ] );
          return this.generateAppinput(
            response[ path[ depth ] ],
            path, index,
            depth + 1,
            firstArray,
            app
          );
      }
    }
  }

  generateArrayInput(
    response: any,
    path: any,
    index: number,
    depth: number,
    firstArray: boolean,
    app: any
  ) {
    app.index = 0;
    app.arrayLength = response.length;
    app.queryId  = this.queryId;
    // console.log( 'Generate Array Input', app );
    return this.generateAppinput(
      response[ app.index ],
      path,
      app.index,
      depth,
      true,
      app
    );
  }

  updateLinkedAppsMethod() {
    // console.log(
    //   'Update Linked Apps Method',
    //   this.indexAppMapping,
    //   this.openAppsInThisPage
    // );
    for (const appHash in this.indexAppMapping) {
      for (const type in this.openAppsInThisPage) {
        if (this.openAppsInThisPage[type].model.length && type !== 'dataChooser') {
          for (const app of this.openAppsInThisPage[type].model) {
            if (this.appInputQueryMapping[app.hash] && appHash === app.hash) {
              for (const input in this.appInputQueryMapping[app.hash]) {
                this.arrayIndicator[this.appInputQueryMapping[app.hash][input]['query']] = [];
                if (this.appInputQueryMapping[app.hash][input]['query'] === this.indexAppMapping[appHash].queryId) {
                  this.updatePath(
                    this.appInputQueryMapping[app.hash][input]['path'],
                    this.indexAppMapping[appHash].index,
                    this.response,
                    this.appInputQueryMapping[app.hash][input]['query']
                  );
                }
                this.findLastArrayIndexAndreplaceItWithIndex(
                  this.indexAppMapping[ appHash ].index,
                  this.appInputQueryMapping[app.hash][input]['query']
                );
              }
            }
          }
        }
      }
    }
  }

  findLastArrayIndexAndreplaceItWithIndex(index: number, query: string) {
    for ( let i = this.arrayIndicator[query].length - 1; i >= 0; i-- ) {
      if ( !isNaN ( Number( this.arrayIndicator[query][ i ] ) ) ) {
        this.arrayIndicator[query][ i ] = index;
        i = -1;
      }
    }
    this.updateAppInputWithNewPath();
  }

  updateAppInputWithNewPath() {
    for ( const queryId in this.arrayIndicator ) {
      for ( const type in this.openAppsInThisPage ) {
        if (this.openAppsInThisPage[type].model.length && type !== 'dataChooser') {
          for (const app of this.openAppsInThisPage[type].model) {
            if (this.appInputQueryMapping[app.hash]) {
              for (const input in this.appInputQueryMapping[app.hash]) {
                if (this.appInputQueryMapping[app.hash][input]['query'] === queryId) {
                  if( this.appInputQueryMapping[app.hash][input][ 'path' ].length > 0 ) {
                    this.updateAppInput(
                      this.response,
                      this.rewritePath(
                        this.appInputQueryMapping[app.hash][input][ 'path' ],
                        this.arrayIndicator[queryId]
                      ),
                      0,
                      app,
                      input
                    );
                    // console.log( input, app[ input ] );
                  }
                }
              }
            }
          }
        }
      }
    }
    this.sendAppTypesBackToNIEOS.emit( this.openAppsInThisPage );
  }
  updateAppInput(
    response: any,
    path: any,
    depth: number,
    app: any,
    input: string
  ) {
    // console.log('Update App Input', response, path[ depth ]);
    if ( response ) {
      if ( response[ path[ depth ] ] && typeof response !== 'string' ) {
        this.updateAppInput(
          response[ path[ depth ] ],
          path,
          depth + 1,
          app,
          input
        );
      } else {
        // console.log( response );
        app[ input ] = response;
      }
    }
  }

  rewritePath( oldPath: any, newPath: any ) {
    let i = 0;
    if ( oldPath.length > 0 ) {
      for ( const newSegment of newPath ) {
        if ( newPath[ i ] !== oldPath[ i ] && oldPath[ i - 1 ] === newPath[ i - 1 ] && oldPath[ i ] ) {
          if ( !isNaN( newPath[ i ]  ) ) {
            oldPath.splice( i, 0, newPath[ i ] );
          }
        }
        i += 1;
      }
      for ( let j = 0; j < oldPath.length; j++ ) {
        if ( !isNaN( oldPath[ j ]  ) ) {
          oldPath[ j ] = this.index;
          j = oldPath.length;
        }
      }
      return oldPath;
    }
  }

  updatePath(
    path: Array<any>,
    index: number,
    response,
    queryId: string
  ) {
    // console.log(
    //   'Update Path',
    //   path,
    //   index,
    //   // response,
    //   this.arrayIndicator
    // );
    /**
     * Find last array in this path and update it with index!
     * */
    if( response && typeof response !== 'string') {
      if ( response[ path[ 0 ] ] ) {
        const segment = path[ 0 ];
        path.splice( 0, 1 );
        this.arrayIndicator[ queryId ].push(segment);
        this.updatePath(
          path,
          index,
          response[ segment ],
          queryId
        );
      } else {
        this.arrayIndicator[ queryId ].push(0);
        this.updatePath(
          path,
          index,
          response[ 0 ],
          queryId
        );
      }
    }
  }
}
