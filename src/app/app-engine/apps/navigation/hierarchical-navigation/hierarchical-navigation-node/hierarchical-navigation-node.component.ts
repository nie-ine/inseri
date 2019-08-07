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
   * Address to the backend with the resource with parentIri.
   */
  @Input() backendAddress;

  /**
   * The parent resource of all resources displayed as blocks.
   */
  @Input() resource: any;

  /**
   * Configuration for this component.
   */
  @Input() nodeConfiguration: HierarchicalNavigationNodeConfiguration;

  @Input() queryParams: any;

  @Input() routeKeys: Array<string>;

  @Output() pathChange = new EventEmitter();

  isInPath = false;

  /**
   * The resources to be displayed as text blocks.
   */
  children: Array<any>;

  childrenAreActive = false;

  /**
   * default written by angular-cli
   */
  constructor(private knoraV2Request: KnoraV2RequestService, private hierarchicalNavigationRequest: HierarchicalNavigationRequestService) { }

  /**
   * load new content with new input variables
   */
  ngOnChanges(changes: SimpleChanges) {

    if ((this.resource && this.nodeConfiguration && this.backendAddress) && (changes['parentIri'] || changes['backendAddress'] || changes['nodeConfiguration'])) {


      //
    }

    if (changes['queryParams'] || changes['routeKeys']) {
      if (this.queryParams[this.nodeConfiguration.routeKey] === this.resource['@id']) {
        this.isInPath = true;
      }
    }

    // TODO: if configuration.children.routeKey is in queryParams, loadChildren()
  }

  loadChildren() {

    this.childrenAreActive = true;

    if (this.resource && this.nodeConfiguration && this.backendAddress && this.nodeConfiguration.children) {

      const graveSearchRequest = this.hierarchicalNavigationRequest.getGravSearch(this.nodeConfiguration.children, this.resource['@id']);

      this.knoraV2Request.extendedSearchFromSpecificInstance(graveSearchRequest, this.backendAddress)
        .subscribe(d => {
          if (d[ '@graph' ]) {
            this.children = d[ '@graph' ];
          } else {
            this.children = [ d ];
          }
        }, error1 => {
          console.log(error1);
        });
    }

  }

  selectThisNode() {
    // Set path to active
    // write new path array

  }


  processPathChange() {
    // Set path to active
    // add this iri to path array

  }

}
