import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { KnoraV2RequestService } from '../../../../../query-engine/knora/knora-v2-request.service';
import { HierarchicalNavigationRequestService } from '../hierarchical-navigation-request.service';
import { HierarchicalNavigationNodeConfiguration } from '../hierarchical-navigation-configuration';

@Component({
  selector: 'app-hierarchical-navigation-node',
  templateUrl: './hierarchical-navigation-node.component.html',
  styleUrls: ['./hierarchical-navigation-node.component.scss']
})
export class HierarchicalNavigationNodeComponent implements OnChanges {

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
   * Query parameters containing the most recent path selection.
   */
  @Input() queryParams: any;

  /**
   * Possible keys that could be part of the path selection.
   */
  @Input() routeKeys: Array<string>;

  /**
   * Send out a new dictionary with a path for the navigation.
   */
  @Output() pathChange = new EventEmitter();

  /**
   * True if the current resource IRI is in the query params. This opens the possibility of marking the path in the tree and
   * calls for a navigation if the children are hidden despite being selected before.
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
   * default written by angular-cli
   */
  constructor(
    private knoraV2Request: KnoraV2RequestService,
    private hierarchicalNavigationRequest: HierarchicalNavigationRequestService) { }

  /**
   * load new content with new input variables
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes['queryParams'] || changes['routeKeys']) {
      this.isInPath = false;

      // if this resource is in the selected path, highlight it
      if (this.queryParams[this.nodeConfiguration.routeKey] === this.resource['@id']) {
        this.isInPath = true;

        // if this resource is in the selected path and has a selected child, load the children
        if (this.nodeConfiguration.children && this.queryParams[this.nodeConfiguration.children.routeKey]) {
          this.loadChildren();
        }
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
      const graveSearchRequest = this.hierarchicalNavigationRequest.getGravSearch(this.nodeConfiguration.children, this.resource['@id']);
      // send query through service
      this.knoraV2Request.extendedSearchFromSpecificInstance(graveSearchRequest, this.backendAddress)
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
