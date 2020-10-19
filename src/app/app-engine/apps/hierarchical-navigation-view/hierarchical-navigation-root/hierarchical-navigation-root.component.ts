import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { HierarchicalNavigationConfiguration } from '../hierarchical-navigation-configuration';
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
   * The resources to be displayed as text blocks.
   */
  children: Array<any>;

  /**
   * Number of dependent resources, to ensure completeness in paged loading.
   */
  totalNumberOfChildren: number;

  /**
   * default written by angular-cli
   */
  constructor(
    private requestService: HierarchicalNavigationRequestService) { }

  /**
   * load new content with new input variables
   */
  ngOnChanges(changes: SimpleChanges) {
    if (
      (this.resourceIri && this.nodeConfiguration && this.backendAddress && this.nodeConfiguration.children) &&
      (changes['resourceIri'] || changes['backendAddress'] || changes['nodeConfiguration'])) {

      // load until a specific child node if specified
      if (this.pathMap[this.nodeConfiguration.children.routeKey]) {
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
      const graveSearchRequest = this.requestService.getGravSearch(
        this.nodeConfiguration.children,
        this.resourceIri,
        0);

      // total number of children
      this.requestService.countExtendedSearchFromSpecificInstance(graveSearchRequest, this.backendAddress)
        .subscribe(d => {
          this.totalNumberOfChildren = d[ 'schema:numberOfItems' ];
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
    if (this.resourceIri && this.nodeConfiguration && this.backendAddress && this.nodeConfiguration.children) {

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

        // request body
        while (iterate) {
          const graveSearchRequest = this.requestService.getGravSearch(
            this.nodeConfiguration.children,
            this.resourceIri,
            this.children.length);

          // request
          this.requestService.extendedSearchFromSpecificInstance(graveSearchRequest, this.backendAddress)
            .subscribe(d => {
              if (d[ '@graph' ]) {
                this.children = d[ '@graph' ];

                // stop if a child matches
                for (const c of d[ '@graph' ]) {
                  if (this.pathMap[this.nodeConfiguration.children.routeKey] === c['@id']) {
                    iterate = false;
                  }
                }
              } else {
                // if only one child
                this.children = [ d ];

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
    if (this.resourceIri && this.nodeConfiguration && this.backendAddress && this.nodeConfiguration.children) {
      const graveSearchRequest = this.requestService.getGravSearch(
        this.nodeConfiguration.children,
        this.resourceIri,
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
   * Send out the new path selection in for of a dictionary.
   * @param event  New path from the root element to the leaf node of the selection.
   */
  processPathChange(event: any) {
    this.pathChange.emit(event);
  }

}
