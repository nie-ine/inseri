import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HierarchicalNavigationConfiguration } from '../hierarchical-navigation-configuration';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-hierarchical-navigation-view',
  templateUrl: './hierarchical-navigation-view.component.html',
  styleUrls: ['./hierarchical-navigation-view.component.scss']
})
export class HierarchicalNavigationViewComponent implements OnChanges {

  // TODO: sorting of children
  // TODO: custom property instead of label

  /**
   * Address to Knora instance with the input data for this component.
   */
  @Input() backendAddress = 'http://localhost:3333';

  /**
   * The root element for the hierarchical-navigation-view view. The root element itself is not shown.
   */
  @Input() navigationRootIri = 'http://rdfh.ch/0041/qetIHdOZTceuFKXIPWXofA';

  /**
   * Configuration of the hierarchical-navigation-view view.
   */
  @Input() navigationConfiguration: HierarchicalNavigationConfiguration = {};

  /**
   * List of the query parameters for the path in the hierarchical-navigation-view. This list helps keeping track of values to delete.
   */
  routeKeys: Array<string>;

  /**
   * Most recent query parameters with the active path.
   */
  pathMap;

  /**
   * Constructor
   * @param _route  Activated route for this component
   * @param _router  Router for hierarchical-navigation-view
   */
  constructor(private _route: ActivatedRoute, private _router: Router) { }

  /**
   * Subscribe to the query parameters and collect path keys.
   */
  ngOnChanges() {
    this._route.queryParams.subscribe(params => {
      // TODO filter out hover and focus
      this.pathMap = params;
    });

    if (this.navigationConfiguration) {
      this.routeKeys = [];
      this.collectPathKeys(this.navigationConfiguration.children);
    }
  }

  /**
   * Recursively collect the possible path keys in the hierarchical-navigation-view configuration.
   * @param configuration
   */
  collectPathKeys(configuration) {
    this.routeKeys.push(configuration.routeKey);
    if (configuration.children) {
      this.collectPathKeys(configuration.children);
    }
  }

  /**
   * If a new resource is selected, update the path to match it.
   * @param newPath  Dictionary of path key and IRI on the respective level.
   */
  navigationChange(newPath) {
    // new parameter object
    const params = {};
    // copy old values
    for (const [k, v] of Object.entries(this.pathMap)) {
      params[k] = v;
    }
    // replace with new values
    for (const [k, v] of Object.entries(newPath)) {
      params[k] = v;
    }
    // execute hierarchical-navigation-view
    this._router.navigate([], {relativeTo: this._route, queryParams: params, queryParamsHandling: 'merge'});
  }

}
