import { Component, Input, OnChanges } from '@angular/core';
import { HierarchicalNavigationConfiguration } from '../hierarchical-navigation-configuration';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-hierarchical-navigation-view',
  templateUrl: './hierarchical-navigation-view.component.html',
  styleUrls: ['./hierarchical-navigation-view.component.scss']
})
export class HierarchicalNavigationViewComponent implements OnChanges {

  /**
   * Address to Knora instance with the input data for this component.
   */
  @Input() backendAddress = 'http://localhost:3333';

  /**
   * The root element for the navigation view. The root element itself is not shown.
   */
  @Input() navigationRootIri = 'http://rdfh.ch/0041/qetIHdOZTceuFKXIPWXofA';

  /**
   * Configuration of the navigation view.
   */
  @Input() navigationConfiguration: HierarchicalNavigationConfiguration = {};

  /**
   * List of the query parameters for the path in the navigation. This list helps keeping track of values to delete.
   */
  routeKeys: Array<string>;

  /**
   * Most recent query parameters with the active path.
   */
  queryParams;

  /**
   * Constructor
   * @param _route  Activated route for this component
   * @param _router  Router for navigation
   */
  constructor(private _route: ActivatedRoute, private _router: Router) { }

  /**
   * Subscribe to the query parameters and collect path keys.
   */
  ngOnChanges() {
    this._route.queryParams.subscribe(params => {
      this.queryParams = params;
    });

    if (this.navigationConfiguration) {
      this.routeKeys = [];
      this.collectPathKeys(this.navigationConfiguration.children);
    }
  }

  /**
   * Recursively collect the possible path keys in the navigation configuration.
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
    for (const [k, v] of Object.entries(this.queryParams)) {
      params[k] = v;
    }
    // replace with new values
    for (const [k, v] of Object.entries(newPath)) {
      params[k] = v;
    }
    // execute navigation
    this._router.navigate([], {relativeTo: this._route, queryParams: params, queryParamsHandling: 'merge'});
  }

}
