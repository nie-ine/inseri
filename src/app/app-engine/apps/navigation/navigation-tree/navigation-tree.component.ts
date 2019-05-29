import { Input, OnInit, OnChanges, EventEmitter, Output } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Injectable } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { ActivatedRoute, Router } from '@angular/router';

interface ResourceNode {
  label: string;
  identifier: string;
  children?: ResourceNode[];
}

/** Flat node with expandable and level information */
interface ResourceFlatNode {
  expandable: boolean;
  identifier: string;
  label: string;
  level: number;
}

@Component({
  selector: 'app-navigation-tree',
  templateUrl: './navigation-tree.component.html',
  styleUrls: [ './navigation-tree.component.scss' ]
})
export class NavigationTreeComponent implements OnChanges {

  @Input() queryResponse: any;
  maximalTreeDepth = 5;
  qParams: any;
  parameterKeyBase = 'd';

  private transformer = (node: ResourceNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      label: node.label,
      identifier: node.identifier,
      level: level
    };
  };

  treeControl = new FlatTreeControl<ResourceFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this.transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private _route: ActivatedRoute, private _router: Router) { }

  ngOnChanges() {
    this._route.queryParams.subscribe(params => {
      this.qParams = JSON.parse(JSON.stringify(params));
    });

    if (this.queryResponse) {
      this.dataSource.data = this.flattenResponseTree(this.queryResponse);
    }
  }

  hasChild = (_: number, _nodeData: ResourceFlatNode) => _nodeData.expandable;

  /**
   * Navigate to a selected node in the tree by updating the query parameters.
   * @param identifier  Unique identifier of a resouce
   * @param level  Depth of the node in the tree
   */
  chooseNode(identifier, level) {
    this.qParams[this.parameterKey(level)] = identifier;
    for (let i = level + 1; i < this.maximalTreeDepth; i++) {
      this.qParams[this.parameterKey(i)] = null;
    }
    console.log(this.qParams);
    this._router.navigate([], {queryParams: this.qParams, relativeTo: this._route});
  }

  /**
   * Convert level of a node in the tree to its query parameter key.
   * @param level
   */
  parameterKey(level): string {
    return this.parameterKeyBase + level;
  }

  /**
   * Convert Knora json-ld tree with incoming links into a less deep tree with children directly accessible.
   * @param responseTree
   */
  flattenResponseTree(responseTree): Array<ResourceNode> {

    const dataDepth0: Array<ResourceNode> = [];

    const responseRoot = responseTree;
    let responseDepth1: Array<any> = [];
    if (Array.isArray(responseRoot[ '@graph' ])) {
      responseDepth1 = responseRoot[ '@graph' ];
    } else {
      responseDepth1 = [ responseRoot[ '@graph' ] ];
    }

    for (let i = 0; i < responseDepth1.length; i++) {
      if (responseDepth1[i]) {

        const dataDepth1: Array<ResourceNode> = [];
        let responseDepth2: Array<any> = [];
        if (Array.isArray(responseDepth1[ i ][ 'knora-api:hasIncomingLinkValue' ])) {
          responseDepth2 = responseDepth1[ i ][ 'knora-api:hasIncomingLinkValue' ];
        } else {
          responseDepth2 = [ responseDepth1[ i ][ 'knora-api:hasIncomingLinkValue' ] ];
        }

        for (let j = 0; j < responseDepth2.length; j++) {
          if (responseDepth2[j]) {

            const dataDepth2: Array<ResourceNode> = [];
            let responseDepth3: Array<any> = [];
            if (Array.isArray(responseDepth2[ j ][ 'knora-api:linkValueHasSource' ][ 'knora-api:hasIncomingLinkValue' ])) {
              responseDepth3 = responseDepth2[ j ][ 'knora-api:linkValueHasSource' ][ 'knora-api:hasIncomingLinkValue' ];
            } else {
              responseDepth3 = [ responseDepth2[ j ][ 'knora-api:linkValueHasSource' ][ 'knora-api:hasIncomingLinkValue' ] ];
            }

            for (let k = 0; k < responseDepth3.length; k++) {
              if (responseDepth3[ k ]) {

                const dataDepth3: Array<ResourceNode> = [];
                let responseDepth4: Array<any> = [];
                if (Array.isArray(responseDepth3[ k ][ 'knora-api:linkValueHasSource' ][ 'knora-api:hasIncomingLinkValue' ])) {
                  responseDepth4 = responseDepth3[ k ][ 'knora-api:linkValueHasSource' ][ 'knora-api:hasIncomingLinkValue' ];
                } else {
                  responseDepth4 = [ responseDepth3[ k ][ 'knora-api:linkValueHasSource' ][ 'knora-api:hasIncomingLinkValue' ] ];
                }

                for (let l = 0; l < responseDepth4.length; l++) {
                  if (responseDepth4[ l ]) {

                    const dataDepth4: Array<ResourceNode> = [];
                    let responseDepth5: Array<any> = [];
                    if (Array.isArray(responseDepth4[ l ][ 'knora-api:linkValueHasSource' ][ 'knora-api:hasIncomingLinkValue' ])) {
                      responseDepth5 = responseDepth4[ l ][ 'knora-api:linkValueHasSource' ][ 'knora-api:hasIncomingLinkValue' ];
                    } else {
                      responseDepth5 = [ responseDepth4[ l ][ 'knora-api:linkValueHasSource' ][ 'knora-api:hasIncomingLinkValue' ] ];
                    }

                    for (let m = 0; m < responseDepth5.length; m++) {
                      if (responseDepth5[ m ]) {

                        // TODO look if more levels are needed

                        const d4: ResourceNode = {
                          'label': responseDepth5[ m ][ 'knora-api:linkValueHasSource' ][ 'rdfs:label' ],
                          'identifier': responseDepth5[ m ][ 'knora-api:linkValueHasSource' ][ '@id' ]
                        };
                        dataDepth4.push(d4);
                      }
                    }
                    const d3: ResourceNode = {
                      'children': dataDepth4,
                      'label': responseDepth4[ l ][ 'knora-api:linkValueHasSource' ][ 'rdfs:label' ],
                      'identifier': responseDepth4[ l ][ 'knora-api:linkValueHasSource' ][ '@id' ]
                    };
                    dataDepth3.push(d3);
                  }
                }
                const d2: ResourceNode = {
                  'children': dataDepth3,
                  'label': responseDepth3[ k ][ 'knora-api:linkValueHasSource' ][ 'rdfs:label' ],
                  'identifier': responseDepth3[ k ][ 'knora-api:linkValueHasSource' ][ '@id' ]
                };
                dataDepth2.push(d2);
              }
            }
            const d1: ResourceNode = {
              'children': dataDepth2,
              'label': responseDepth2[ j ][ 'knora-api:linkValueHasSource' ][ 'rdfs:label' ],
              'identifier': responseDepth2[ j ][ 'knora-api:linkValueHasSource' ][ '@id' ]
            };
            dataDepth1.push(d1);
          }
        }
        const d0: ResourceNode = {
          'children': dataDepth1,
          'label': responseDepth1[ i ][ 'rdfs:label' ],
          'identifier': responseDepth1[ i ][ '@id' ]
        };
        dataDepth0.push(d0);
      }
    }

    return dataDepth0;
  }

}
