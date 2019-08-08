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
      (this.resourceIri && this.nodeConfiguration && this.backendAddress) &&
      (changes['parentIri'] || changes['backendAddress'] || changes['nodeConfiguration'])) {
      this.loadChildren();
    }
  }

  /**
   * Load the children of the root element.
   */
  loadChildren() {
    if (this.resourceIri && this.nodeConfiguration && this.backendAddress && this.nodeConfiguration.children) {
      const graveSearchRequest = this.hierarchicalNavigationRequest.getGravSearch(this.nodeConfiguration.children, this.resourceIri);
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
   * Send out the new path selection in for of a dictionary.
   * @param event  New path from the root element to the leaf node of the selection.
   */
  processPathChange(event: any) {
    this.pathChange.emit(event);
  }

}
