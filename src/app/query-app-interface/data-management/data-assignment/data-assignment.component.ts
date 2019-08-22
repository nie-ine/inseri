/**
 * This component assigns the data chosen by the user through the data chooser
 * to each respective input of an open app.
 * If part a of json response of query b is mapped by the user to app c input d, this component
 * assigns a to d.
 * This method is invoked in the page.html
 * */


import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

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
  constructor() { }

  /**
   * ngOnChages is triggered when a user chooses an entry in the data chooser
   * */
  ngOnChanges( changes: SimpleChanges) {
    this.firstChange = true;
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

  startPathUpdateProcess() {

    /**
     * Initiates currentindex if not defined
     * */
    if ( !this.currentIndex ) {
      this.currentIndex = {};
    }
    if ( !this.currentIndex[ this.queryId ] ) {
      this.currentIndex[ this.queryId ] = {};
    }
    this.currentIndex[ this.queryId ][ this.depth ] = this.index;

    /**
     * Iterates through every input of every app and performs the updatePathWithindices
     * method for each input
     * */
    for ( const appHash in this.appInputQueryMapping ) {
      for ( const inputName in this.appInputQueryMapping[ appHash ] ) {
        if ( this.appInputQueryMapping[ appHash ][ inputName ].query === this.queryId ) {
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

  /**
   * This method is recursively going through parts of the json and checks if the part of the json has
   * been reached that the user has mapped to the app input
   * */
  updatePathWithIndices(
    path: Array<string>,
    response: any,
    currentIndex: any,
    indexDepth: number,
    pathDepth: number
  ) {
    let deleteCount = 0;

    /**
     * This if statement if the currently treated part of the json response is and array
     * */
    if (
      response && path &&
      response[ path[ pathDepth ] ] &&
      response[ path[ pathDepth ] ].length > 0
    ) {

      /**
       * This if statement checks if the right depth in the json response has been reached already
       * */
        if ( indexDepth === this.depth ) {

          /**
           * This if statement checks if the next segment of the path is a number
           * */
          if ( !isNaN( Number( path[ pathDepth + 1 ] ) ) ) {
            deleteCount = 1;
          }
          /**
           * the following routine replaces the path entry which is a scalar with the
           * entry chosen by the user, only if this path entry is not at the deepest level
           * of the json
           * */
          if ( pathDepth + 1 !== path.length ) {
            path.splice(pathDepth + 1, deleteCount, currentIndex[ indexDepth ]);
          }
        }
        indexDepth += 1;
      }

    /**
     * If the routine updatePathWithIndices has not reached the right depth, chosen by the user,
     * it is recursively invoced again, going one depth further in the json
     * */
    if ( path && path.length > pathDepth + 1 && response ) {
      this.updatePathWithIndices(
        path,
        response[ path[ pathDepth ] ],
        currentIndex,
        indexDepth,
        pathDepth + 1
      );
    }
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
    firstArray: boolean
  ) {
    if ( response ) {

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
            return response;
          } else {

            /**
             * Todo: document the following to conditional statements
             * */
            if ( firstArray ) {
              return this.generateAppinput(
                response[ index ],
                path,
                index,
                depth + 1,
                false
              );
            }
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
