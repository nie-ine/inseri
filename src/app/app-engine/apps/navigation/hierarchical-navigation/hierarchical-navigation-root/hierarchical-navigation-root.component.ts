import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { HierarchicalNavigationConfiguration } from '../hierarchical-navigation-configuration';
import { KnoraV2RequestService } from '../../../../../query-engine/knora/knora-v2-request.service';
import { HierarchicalNavigationRequestService } from '../hierarchical-navigation-request.service';

@Component({
  selector: 'app-hierarchical-navigation-root',
  templateUrl: './hierarchical-navigation-root.component.html',
  styleUrls: ['./hierarchical-navigation-root.component.scss']
})
export class HierarchicalNavigationRootComponent implements OnChanges {

  /**
   * Address to the backend with the resource with the resource.
   */
  @Input() backendAddress;

  /**
   * The resource to be displayed in this component.
   */
  @Input() resourceIri: string;

  /**
   * Configuration for this component.
   */
  @Input() nodeConfiguration: HierarchicalNavigationConfiguration;

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
   * The resources to be displayed as text blocks.
   */
  children: Array<any>;

  totalNumberOfChildren: number;

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
    if (
      (this.resourceIri && this.nodeConfiguration && this.backendAddress && this.nodeConfiguration.children) &&
      (changes['parentIri'] || changes['backendAddress'] || changes['nodeConfiguration'])) {

      // load until a specific child node if specified
      if (this.queryParams[this.nodeConfiguration.children.routeKey]) {
        this.loadChildrenUntil();
      } else {
        this.loadChildren();
      }
    }
  }

  /**
   * Load the children of the root element.
   */
  loadChildren() {
    if (this.resourceIri && this.nodeConfiguration && this.backendAddress && this.nodeConfiguration.children) {

      // request body
      const graveSearchRequest = this.hierarchicalNavigationRequest.getGravSearch(
        this.nodeConfiguration.children,
        this.resourceIri,
        0);

      // total number of children
      this.knoraV2Request.countExtendedSearchFromSpecificInstance(graveSearchRequest, this.backendAddress)
        .subscribe(d => {
          this.totalNumberOfChildren = d[ 'schema:numberOfItems' ];
        }, error1 => {
          console.log(error1);
        });

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
   * Load children until an id of a child matches that of the child in the query parameters.
   */
  loadChildrenUntil() {
    if (this.resourceIri && this.nodeConfiguration && this.backendAddress && this.nodeConfiguration.children) {

      // first load of children (understand this as do-while)
      this.loadChildren();

      if (this.children && this.children.length > this.totalNumberOfChildren) {

        // condition of while
        let iterate = true;

        // stop if the id is already found
        for (const c of this.children) {
          if (this.queryParams[this.nodeConfiguration.children.routeKey] === c['@id']) {
            iterate = false;
          }
        }

        // request body
        while (iterate) {
          const graveSearchRequest = this.hierarchicalNavigationRequest.getGravSearch(
            this.nodeConfiguration.children,
            this.resourceIri,
            this.children.length);

          // request
          this.knoraV2Request.extendedSearchFromSpecificInstance(graveSearchRequest, this.backendAddress)
            .subscribe(d => {
              if (d[ '@graph' ]) {
                this.children = d[ '@graph' ];

                // stop if a child matches
                for (const c of d[ '@graph' ]) {
                  if (this.queryParams[this.nodeConfiguration.children.routeKey] === c['@id']) {
                    iterate = false;
                  }
                }
              } else {
                // if only one child
                this.children = [ d ];

                if (this.queryParams[this.nodeConfiguration.children.routeKey] === d['@id']) {
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
    if (this.resourceIri && this.nodeConfiguration && this.backendAddress && this.nodeConfiguration.children) {
      const graveSearchRequest = this.hierarchicalNavigationRequest.getGravSearch(
        this.nodeConfiguration.children,
        this.resourceIri,
        this.children.length);

      this.knoraV2Request.extendedSearchFromSpecificInstance(graveSearchRequest, this.backendAddress)
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
   * Send out the new path selection in for of a dictionary.
   * @param event  New path from the root element to the leaf node of the selection.
   */
  processPathChange(event: any) {
    this.pathChange.emit(event);
  }

}
