import { Component, Input, OnChanges } from '@angular/core';
import { HierarchicalNavigationConfiguration } from '../hierarchical-navigation-configuration';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-hierarchical-navigation-view',
  templateUrl: './hierarchical-navigation-view.component.html',
  styleUrls: ['./hierarchical-navigation-view.component.scss']
})
export class HierarchicalNavigationViewComponent implements OnChanges {

  @Input() backendAddress = 'http://localhost:3333';

  @Input() navigationRootIri = 'http://rdfh.ch/0041/qetIHdOZTceuFKXIPWXofA';

  @Input() navigationConfiguration: HierarchicalNavigationConfiguration = {};

  routeKeys: Array<string>;

  queryParams;

  /**
   * Constructor
   * @param _route  Activated route for this component
   * @param _router  Router for navigation
   */
  constructor(private _route: ActivatedRoute, private _router: Router) { }

  /**
   * Subscribe to the query parameters for focus, hovering and other selections.
   */
  ngOnChanges() {
    this._route.queryParams.subscribe(params => {
      this.queryParams = params;
    });

    if (this.navigationConfiguration) {
      this.routeKeys = [];
      this.collectPathKeys(this.navigationConfiguration.children);
      //
    }
  }

  collectPathKeys(configuration) {
    this.routeKeys.push(configuration.routeKey);

    if (configuration.children) {
      this.collectPathKeys(configuration.children);
    }
    // else, we are done
  }

  navigationChange() {
    const params = {};
    // delete route Keys from new queryParam object (does setting to null and merge work?)
    // set new route into queryParams object
    // navigate with queryParam object

    this._router.navigate([], {relativeTo: this._route, queryParams: params, queryParamsHandling: 'merge'});

  }


}
