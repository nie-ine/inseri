import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { HierarchicalNavigationNodeConfiguration } from '../hierarchical-navigation-configuration';
import { HierarchicalNavigationRequestService } from '../hierarchical-navigation-request.service';

@Component({
  selector: 'app-hierarchical-navigation-node',
  templateUrl: './hierarchical-navigation-node.component.html',
  styleUrls: ['./hierarchical-navigation-node.component.scss']
})
export class HierarchicalNavigationNodeComponent implements OnChanges, OnInit {

  /**
   * Address to the backend with the resource with the resource.
   */
  @Input() backendAddress;

  /**
   * The resource to be displayed in this component.
   */
  @Input() resource: any;

  /**
   * Configuration for this component.
   */
  @Input() nodeConfiguration: HierarchicalNavigationNodeConfiguration;

  /**
   * Subset of query parameters containing the most recent path selection.
   */
  @Input() pathMap: any;

  /**
   * Possible keys that could be part of the path selection.
   */
  @Input() routeKeys: Array<string>;

  /**
   * Send out a new dictionary with a path for the hierarchical-navigation-view.
   */
  @Output() pathChange = new EventEmitter();

  /**
   * True if the current resource IRI is in the query params. This opens the possibility of marking the path in the tree and
   * calls for a hierarchical-navigation-view if the children are hidden despite being selected before.
   */
  isInPath = false;

  /**
   * The resources to be displayed as text blocks.
   */
  children: Array<any>;

  /**
   * True if the children of this node are visible.
   */
  childrenAreActive = false;

  /**
   * Total number of children that are connected to this resource in the wanted way.
   */
  totalNumberOfChildren: number;

  /**
   * default written by angular-cli
   */
  constructor(
    private requestService: HierarchicalNavigationRequestService) { }

  /**
   * load load children if this node is selected
   */
  ngOnInit() {
    // if this resource is in the selected path, highlight it
    if (this.pathMap[ this.nodeConfiguration.routeKey ] === this.resource[ '@id' ]) {

      // if this resource is in the selected path and has a selected child, load the children
      if (this.nodeConfiguration.children && this.pathMap[ this.nodeConfiguration.children.routeKey ]) {
        this.loadChildrenUntil();
      }
    }
  }

  /**
   * update path information
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes[ 'pathMap' ] || changes[ 'routeKeys' ]) {
      this.isInPath = false;

      // if this resource is in the selected path, highlight it
      if (this.pathMap[ this.nodeConfiguration.routeKey ] === this.resource[ '@id' ]) {
        this.isInPath = true;
      }
    }
  }

  /**
   * Load the child nodes of this node.
   */
  loadChildren() {
    this.childrenAreActive = true;
    if (this.resource && this.nodeConfiguration && this.backendAddress && this.nodeConfiguration.children) {
      // get body of HTTP post query
      const graveSearchRequest = this.requestService.getGravSearch(
        this.nodeConfiguration.children,
        this.resource['@id'],
        0);

      // total number of children (for further loading)
      this.requestService.countExtendedSearchFromSpecificInstance(graveSearchRequest, this.backendAddress)
        .subscribe(d => {
          this.totalNumberOfChildren = d['schema:numberOfItems'];
        }, error1 => {
          console.log(error1);
        });

      // send query through service
      this.requestService.extendedSearchFromSpecificInstance(graveSearchRequest, this.backendAddress)
        .subscribe(d => {
          if (d[ '@graph' ]) {
            this.children = d[ '@graph' ];
          } else {
            // if only one child
            this.children = [ d ];
          }
        }, error1 => {
          console.log(error1);
        });
    }
  }

  /**
   * Load children until an id of a child matches that of the child in the query parameters.
   */
  loadChildrenUntil() {
    if (this.resource && this.nodeConfiguration && this.backendAddress && this.nodeConfiguration.children) {

      // first load of children (understand this as do-while)
      this.loadChildren();

      if (this.children && this.children.length > this.totalNumberOfChildren) {

        // condition of while
        let iterate = true;

        // stop if the id is already found
        for (const c of this.children) {
          if (this.pathMap[this.nodeConfiguration.children.routeKey] === c['@id']) {
            iterate = false;
          }
        }

        // repeat until id is found
        while (iterate) {

          // request body
          const graveSearchRequest = this.requestService.getGravSearch(
            this.nodeConfiguration.children,
            this.resource['@id'],
            this.children.length);

          // request
          this.requestService.extendedSearchFromSpecificInstance(graveSearchRequest, this.backendAddress)
            .subscribe(d => {
              if (d[ '@graph' ]) {
                // append children
                this.children.concat(d[ '@graph' ]);

                // stop if a child matches
                for (const c of d[ '@graph' ]) {
                  if (this.pathMap[this.nodeConfiguration.children.routeKey] === c['@id']) {
                    iterate = false;
                  }
                }
              } else {
                // if only one child
                this.children.concat([ d ]);

                if (this.pathMap[this.nodeConfiguration.children.routeKey] === d['@id']) {
                  iterate = false;
                }
              }
            }, error1 => {
              console.log(error1);
            });

          // stop if the number of loaded children reaches the total number of possible children
          if (this.children.length >= this.totalNumberOfChildren) {
            iterate = false;
          }
        }
      }
    }
  }

  /**
   * Load the next page of children
   */
  loadMoreChildren() {
    if (this.resource && this.nodeConfiguration && this.backendAddress && this.nodeConfiguration.children) {
      const graveSearchRequest = this.requestService.getGravSearch(
        this.nodeConfiguration.children,
        this.resource['@id'],
        this.children.length);

      this.requestService.extendedSearchFromSpecificInstance(graveSearchRequest, this.backendAddress)
        .subscribe(d => {
          if (d[ '@graph' ]) {
            this.children.concat(d[ '@graph' ]);
          } else {
            // if only one child
            this.children.concat([ d ]);
          }
        }, error1 => {
          console.log(error1);
        });
    }
  }

  /**
   * Hide the nodes children and navigate if needed.
   */
  hideChildren() {
    this.childrenAreActive = false;
    if (this.isInPath) {
      // delete the child nodes and shorten the path if they were selected before.
      this.children = [];
      this.selectNode();
    } else {
      // delete the child nodes
      this.children = [];
    }
  }

  /**
   * Select a node after clicking by emptying the path to the previously selected children.
   */
  selectNode() {
    const pathParams = {};
    for (const k of this.routeKeys) {
      pathParams[k] = null;
    }
    this.processPathChange(pathParams);
  }

  /**
   * On important changes, emit the path from the parent of this resource to the deepest selected resource.
   * @param pathToChildren  The path from this resource to the selected child paths (if any).
   * */
  processPathChange(pathToChildren) {
    pathToChildren[this.nodeConfiguration.routeKey] = this.resource['@id'];
    this.pathChange.emit(pathToChildren);
  }

}
