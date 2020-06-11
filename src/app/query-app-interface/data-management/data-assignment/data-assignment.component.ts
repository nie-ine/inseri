/**
 * This component assigns the data chosen by the user through the data chooser
 * to each respective input of an open app.
 * If part a of json response of query b is mapped by the user to app c input d, this component
 * assigns a to d.
 * This method is invoked in the page.html
 * */


import {AfterViewChecked, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-data-assignment',
  templateUrl: './data-assignment.component.html'
})
export class DataAssignmentComponent implements OnChanges {

  /**
   * the index emitted when a user clicks on the data chooser
   * */
  @Input() index: number;

  /**
   * The open apps on the current page, this is the same variable that page.html iterates through
   * */
  @Input() openAppsInThisPage: any;

  /**
   * This object stores, which part of the json of wchi query is mapped to which input
   * */
  @Input() appInputQueryMapping: any;

  /**
   * This is the response of the respective query
   * */
  @Input() response: any;

  /**
   * This is the id of the query that this component is dealing with
   * */
  @Input() queryId;

  /**
   * This input is not used anymore, TODO: invest if this variable can be deleted
   * */
  @Input() updateLinkedApps = false;

  /**
   * This input is not used anymore, TODO: invest if this variable can be deleted
   * */
  @Input() indexAppMapping: any;

  /**
   * In the data chooser, you can choose entries in different depths of the json. After
   * each array that occurs in the json, the depth is incremented by one. Thus,
   * the number of nested arrays defines the meaning of the depth.
   * */
  @Input() depth: number;

  @Input() pathWithArray: Array<string>;

  /**
   * After assigning the inputs to the app variables, this output sends back
   * the variable openAppsInThisPage
   * */
  @Output() sendAppTypesBackToNIEOS: EventEmitter<any> = new EventEmitter<any>();
  arrayIndicator: Array<any> = [];

  /**
   * currentIndex is an array: currentIndex[ queryId ][ depth ] = index defines which
   * index in which depth of which query is chosen by the user in the data chooser
   * */
  currentIndex: any = {};
  firstChange = true;
  changes: any;
  currentPath: any;
  constructor() { }

  /**
   * ngOnChages is triggered when a user chooses an entry in the data chooser
   * */
  ngOnChanges( changes: SimpleChanges ) {
    // console.log( this.openAppsInThisPage );
    this.firstChange = true;
    // console.log( changes );
      this.startPathUpdateProcess();

      /**
       * the path is the path through the json response of the respective query.
       * if the deepest layer of the json response is an array with strings as values,
       * the user can choose in the appInputQueryMapping GUI to define an entry of the
       * array that should be mapped to an app input. The following routine checks if
       * the last segment of the path defined by the user is a scalar which deinfe
       * */
      this.checkIfPathContainsScalarAsLastEntry();
  }

  startPathUpdateProcess(
    queryId?: string,
    pathWithArray?: Array<string>,
    index?: number,
    response?: any,
    depth?: number,
    appInputQueryMapping?: any,
    openAppsInThisPage?: any
  ) {

    if ( queryId ) {
      this.queryId = queryId;
    }

    if ( pathWithArray ) {
      this.pathWithArray = pathWithArray;
    }

    // this.pathWithArray = this.pathWithArray !== undefined ? this.pathWithArray : [];

    this.index = index !== undefined ? index : 0;

    if ( response ) {
      this.response = response;
    }

    if ( openAppsInThisPage ) {
      this.openAppsInThisPage = openAppsInThisPage;
    }

    this.depth = depth !== undefined ? depth : 0;

    this.appInputQueryMapping = appInputQueryMapping !== undefined ? appInputQueryMapping : this.appInputQueryMapping;

    // console.log( this.queryId, this.depth, this.pathWithArray );

    /**
     * Initiates currentindex if not defined
     * */
    if ( !this.currentIndex ) {
      this.currentIndex = {};
    }
    if ( !this.currentIndex[ this.queryId ] && this.queryId ) {
      this.currentIndex[ this.queryId ] = {};
    }
    if ( this.pathWithArray ) {
      this.currentIndex[ this.queryId ][ this.pathWithArray.toString() ] = this.index;
      // console.log( this.currentIndex );
    }

    /**
     * Iterates through every input of every app and performs the updatePathWithindices
     * method for each input
     * */
    // console.log( this.appInputQueryMapping, appInputQueryMapping );
    for ( const appHash in this.appInputQueryMapping ) {
      for ( const inputName in this.appInputQueryMapping[ appHash ] ) {

        // console.log( this.appInputQueryMapping[ appHash ][ inputName ].query, this.queryId );

        if ( this.appInputQueryMapping[ appHash ][ inputName ].query === this.queryId &&
          this.appInputQueryMapping[ appHash ][ inputName ].path ) {
          // console.log( appHash );

          let difference = 0;
          let allTheSameSegments = true;

          const helpArray = [];

          // console.log( this.appInputQueryMapping[ appHash ][ inputName ].path, this.pathWithArray, this.index );

          for ( let i = 0; i < this.appInputQueryMapping[ appHash ][ inputName ].path.length; i++ ) {

            if ( typeof this.appInputQueryMapping[ appHash ][ inputName ].path[ i ] !== 'number' ) {

              // console.log( this.pathWithArray );

              if ( this.pathWithArray &&
                this.appInputQueryMapping[ appHash ][ inputName ].path[ i ] === this.pathWithArray[ i - difference ] ) {

                // console.log( this.pathWithArray[ i - difference ], i, difference, this.pathWithArray.length );
                if ( i - difference  === this.pathWithArray.length - 1 && allTheSameSegments ) {

                  // console.log( this.appInputQueryMapping[ appHash ][ inputName ].path[ i ] );
                  if ( typeof this.appInputQueryMapping[ appHash ][ inputName ].path[ i + 1 ] === 'number' ) {

                    this.appInputQueryMapping[ appHash ][ inputName ].path[ i + 1 ] = this.index;

                  } else {

                    this.appInputQueryMapping[ appHash ][ inputName ].path.splice( i + 1, 0, this.index );

                  }

                  // console.log( this.appInputQueryMapping[ appHash ][ inputName ].path );

                }

              } else {

                allTheSameSegments = false;

              }

            } else {
              difference += 1;
            }

          }
          // console.log( this.appInputQueryMapping[ appHash ][ inputName ].path );
        }
      }
      // console.log( this.appInputQueryMapping[ appHash ] );
    }
    this.goThroughAppInputs();
  }

  /**
   * When the page.component is loaded for the first time, this function is invoked.
   * If the last part of the path is an number, the function goThroughAppInputs is invoked directly.
   * Thus, the inputs of the appInputs mapped to the respective apps are filled immediately.
   * */
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
                console.log('Go through app input');
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
    // console.log( this.openAppsInThisPage );
    // console.log( 'goThroughAppInputs' );
    for ( const type in this.openAppsInThisPage ) {
      if (  this.openAppsInThisPage[ type ].model.length && type !== 'dataChooser' ) {
        for ( const app of this.openAppsInThisPage[ type ].model ) {
          // console.log( this.openAppsInThisPage );
          if ( this.appInputQueryMapping && this.appInputQueryMapping[ app.hash ] ) {
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
                  /**
                   * Here, the appInput is assigned to the respective part of the json
                   * */
                  // console.log( this.queryId, this.response, this.appInputQueryMapping[ app.hash ][ input ][ 'path' ], this.index );
                  app[ input ] = this.generateAppinput(
                    this.response || response,
                    this.appInputQueryMapping[ app.hash ][ input ][ 'path' ],
                    this.index,
                    0,
                    true
                  );
              }
            }
          }
        }
      }
    }
  }

  /**
   * This method returns the respective json part that is assigned to the respective appInput
   * */
  generateAppinput(
    response: any,
    path: any,
    index: number,
    depth: number,
    firstArray: boolean // indicates, if the response as this input is the first array with length > 1
  ) {
    if ( response ) {
      // console.log( path, response );
      if ( response[ path[ depth ] ] && response[ path[ depth ] ].length === 1 ) {
        // console.log( response[ path[ depth ] ], response, path, depth );
        return this.generateAppinput(
          response[ path[ depth ] ][ 0 ],
          path,
          index,
          depth + 1,
          true
        );
      }

      /**
       * If the whole json response is mapped to an app, the whole reponse is returned from this function
       * */
        if ( path[ 0 ] === 'wholeJsonResponseAssignedToThisAppInput' ) {
          return response;
        }

        /**
         * if the path has only one segment, the right part of the json can be returned immediately
         * */
        if ( path.length === 1 ) {
          return response[ path[ 0 ] ];
        } else if ( response.length  ) {
          /**
           * The statement else if above is invoked if the current part of the response is an array
           * */

          /**
           * The following if statement checks if the current segment of the path is a number.
           * It should be a number since in this else if body, deals with an array as part of the json
           * reponse.
           * */
          if ( !isNaN( path[ depth ] ) ) {
            // console.log( 'path segment is number' );
            // console.log( response[ path[ depth ] ] );
            return this.generateAppinput(
              response[ path[ depth ] ],
              path,
              index,
              depth + 1,
              false
            );
          }

          /**
           * If the next segment of the path is a number and its the deepest segment of the
           * path, the respective part of the json can be returned immediately
           * */
          if (
            depth === path.length - 1  &&
            !isNaN( Number ( path[ path.length - 1 ] ) )
          ) {
            return response[ Number ( path[ depth ] ) ];
          }
          if ( typeof response === 'string' ) {
            // console.log( response );
            return response;
          } else {

            /**
             * Todo: document the following to conditional statements
             * */
            // console.log( response, index, path, depth, path[ depth ] );
            return this.generateAppinput(
              response[ index ],
              path,
              index,
              depth,
              false
            );
          }
        } else if ( depth !== path.length && response[ path[ depth ] ] ) {
          /**
           * The else if statement above is invoked if the currently treated part of the json is not an array
           * */

          /**
           * if you have reached the right depth of the json, you can return the response
           * */
          if ( response[ path[ depth + 1 ] ] === undefined && depth === path.length - 1 ) {
            return response[ path[ depth ] ];
          } else {
            /**
             * otherwise you recursively invoke the current method to go one step further in the current json
             * */
            // console.log( 'here1' );
            // console.log( response, index, path, depth, path[ depth ] );
            return this.generateAppinput(
              response[ path[ depth ] ],
              path,
              index,
              depth + 1,
              firstArray
            );
          }
        } else if ( depth === path.length ) {
          return response[ path[ depth - 1 ] ];
        } else if ( path.length - 1 === depth && Number( path[ depth ] ) ) {
          return response[ path[ depth - 1 ] ][ Number( path[ depth ] ) ];
        } else {
          // console.log( 'here2' );
          return this.generateAppinput(
            response[ path[ depth ] ],
            path, index,
            depth + 1,
            firstArray
          );
      }
    }
  }
}
