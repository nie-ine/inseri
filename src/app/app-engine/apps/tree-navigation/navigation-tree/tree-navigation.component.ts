import { Input, OnInit, OnChanges, EventEmitter, Output } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Injectable } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { ActivatedRoute, Router } from '@angular/router';

/** Node with label (displayed), identifier (unique), path (parent identifiers), child nodes */
interface ResourceNode {
  label: string;
  identifier: string;
  path: string[];
  children?: ResourceNode[];
}

/** Flat node with expandable and level information */
interface ResourceFlatNode {
  expandable: boolean;
  identifier: string;
  path: string[];
  label: string;
  level: number;
}

@Component({
  selector: 'app-tree-navigation',
  templateUrl: './tree-navigation.component.html',
  styleUrls: [ './tree-navigation.component.scss' ]
})
export class TreeNavigationComponent implements OnChanges, OnInit {

  /**
   * JSON-LD tree from Knora extended search.
   */
  @Input() queryResponse: any;

  /**
   * The maximal depth supported by the hierarchical-navigation-view tree.
   * If more than 5, expand the function `flattenResponseTree` and update this comment.
   */
  maximalTreeDepth = 5;

  /**
   * Copy of queryParams of this page
   */
  qParams: any;

  /**
   * The prefix used for the queryParams for the path in the hierarchical-navigation-view tree.
   */
  parameterKeyBase = 'd';

  /**
   * Flattener for nodes as needed for FlatTreeControl
   * @param node
   * @param level
   */
  private transformer = (node: ResourceNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      label: node.label,
      identifier: node.identifier,
      path: node.path,
      level: level
    };
  };

  /**
   * Flat tree control for recursive expansion and collapsing of subtrees
   * https://material.angular.io/cdk/tree/api
   */
  treeControl = new FlatTreeControl<ResourceFlatNode>(
    node => node.level, node => node.expandable);

  /**
   * Tree flattener as defined in @angular/material/tree
   * https://material.angular.io/components/tree/api
   */
  treeFlattener = new MatTreeFlattener(
    this.transformer, node => node.level, node => node.expandable, node => node.children);

  /**
   * Data source as defined in @angular/material/tree
   * https://material.angular.io/components/tree/api
   */
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private _route: ActivatedRoute, private _router: Router) { }

  /**
   * Query a nested structure from Knora.
   */
  ngOnChanges() {
    if (this.queryResponse === undefined) {
      this.queryResponse = {
        "@graph" : [ {
          "@id" : "http://rdfh.ch/0041/07GyRR1fQLSjaIlAjRTq_Q",
          "knora-api:hasIncomingLinkValue" : [ {
            "@id" : "http://rdfh.ch/0041/CEdPhqFoRqa4JMrLokpwHw/values/UggSvRfhQ2eCYrdD56TTJg",
            "knora-api:linkValueHasSource" : {
              "@id" : "http://rdfh.ch/0041/CEdPhqFoRqa4JMrLokpwHw",
              "knora-api:hasIncomingLinkValue" : [ {
                "@id" : "http://rdfh.ch/0041/Gm5PgeLGSRigeey7qQdLPQ/values/fSsQheDbQjW884yWYzbwAg",
                "knora-api:linkValueHasSource" : {
                  "@id" : "http://rdfh.ch/0041/Gm5PgeLGSRigeey7qQdLPQ",
                  "rdf-any:isPartOfValue" : {
                    "@id" : "http://rdfh.ch/0041/Gm5PgeLGSRigeey7qQdLPQ/values/fSsQheDbQjW884yWYzbwAg",
                    "knora-api:linkValueHasTargetIri" : {
                      "@id" : "http://rdfh.ch/0041/CEdPhqFoRqa4JMrLokpwHw"
                    }
                  },
                  "rdfs:label" : "1.1.2"
                }
              }, {
                "@id" : "http://rdfh.ch/0041/WA9dphq9RpmXkq5nSo6q3Q/values/hCPW4zkMQ1qzP-dm9H4OJg",
                "knora-api:linkValueHasSource" : {
                  "@id" : "http://rdfh.ch/0041/WA9dphq9RpmXkq5nSo6q3Q",
                  "rdf-any:isPartOfValue" : {
                    "@id" : "http://rdfh.ch/0041/WA9dphq9RpmXkq5nSo6q3Q/values/hCPW4zkMQ1qzP-dm9H4OJg",
                    "knora-api:linkValueHasTargetIri" : {
                      "@id" : "http://rdfh.ch/0041/CEdPhqFoRqa4JMrLokpwHw"
                    }
                  },
                  "rdfs:label" : "1.1.1"
                }
              } ],
              "http://api.knora.org/ontology/shared/literature/v2#isPartOfVerseSongbookValue" : {
                "@id" : "http://rdfh.ch/0041/CEdPhqFoRqa4JMrLokpwHw/values/UggSvRfhQ2eCYrdD56TTJg",
                "knora-api:linkValueHasTargetIri" : {
                  "@id" : "http://rdfh.ch/0041/07GyRR1fQLSjaIlAjRTq_Q"
                }
              },
              "rdfs:label" : "1.1 Preface"
            }
          }, {
            "@id" : "http://rdfh.ch/0041/wGhv_G4WRY6oFheTUKfe0g/values/4DnXHLSrTQ-GISigvqI61w",
            "knora-api:linkValueHasSource" : {
              "@id" : "http://rdfh.ch/0041/wGhv_G4WRY6oFheTUKfe0g",
              "knora-api:hasIncomingLinkValue" : [ {
                "@id" : "http://rdfh.ch/0041/DjQku61RQqSw0pb6v0wubg/values/AMLosisfT2es99L_glnEpg",
                "knora-api:linkValueHasSource" : {
                  "@id" : "http://rdfh.ch/0041/DjQku61RQqSw0pb6v0wubg",
                  "rdf-any:isPartOfValue" : {
                    "@id" : "http://rdfh.ch/0041/DjQku61RQqSw0pb6v0wubg/values/AMLosisfT2es99L_glnEpg"
                  },
                  "rdfs:label" : "1.2.1"
                }
              }, {
                "@id" : "http://rdfh.ch/0041/pPyHJDIiQIm-t1GJtdd_KQ/values/BGNpnIcrTP6qEWOQjsKEUw",
                "knora-api:linkValueHasSource" : {
                  "@id" : "http://rdfh.ch/0041/pPyHJDIiQIm-t1GJtdd_KQ",
                  "rdf-any:isPartOfValue" : {
                    "@id" : "http://rdfh.ch/0041/pPyHJDIiQIm-t1GJtdd_KQ/values/BGNpnIcrTP6qEWOQjsKEUw",
                    "knora-api:linkValueHasTargetIri" : {
                      "@id" : "http://rdfh.ch/0041/wGhv_G4WRY6oFheTUKfe0g"
                    }
                  },
                  "rdfs:label" : "1.2.2"
                }
              } ],
              "http://api.knora.org/ontology/shared/literature/v2#isPartOfVerseSongbookValue" : {
                "@id" : "http://rdfh.ch/0041/wGhv_G4WRY6oFheTUKfe0g/values/4DnXHLSrTQ-GISigvqI61w",
                "knora-api:linkValueHasTargetIri" : {
                  "@id" : "http://rdfh.ch/0041/07GyRR1fQLSjaIlAjRTq_Q"
                }
              },
              "rdfs:label" : "1.2 Introduction"
            }
          } ],
          "rdfs:label" : "1 First Part"
        }, {
          "@id" : "http://rdfh.ch/0041/KJ7tU9IwSZyFL90cLp0-dQ",
          "rdfs:label" : "2 Second Part"
        } ],
        "@context" : {
          "rdf" : "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
          "knora-api" : "http://api.knora.org/ontology/knora-api/v2#",
          "rdfs" : "http://www.w3.org/2000/01/rdf-schema#",
          "xsd" : "http://www.w3.org/2001/XMLSchema#"
        }
      };
    }

    this._route.queryParams.subscribe(params => {
      this.qParams = JSON.parse(JSON.stringify(params));
    });

    if (this.queryResponse) {
      this.dataSource.data = this.flattenResponseTree(this.queryResponse);
    }
  }

  ngOnInit() {
    if (this.treeControl.dataNodes) {
      for (const n of this.treeControl.dataNodes) {
        for (let i = 0; i < this.maximalTreeDepth; i++) {
          if (n.identifier === this.qParams[ this.parameterKey(i) ]) {
            this.treeControl.expand(n);
          }
        }
      }
    }
  }

  /**
   * Boolean function that tells the template if a tree node is expandable.
   */
  hasChild = (_: number, _nodeData: ResourceFlatNode) => _nodeData.expandable;

  /**
   * Navigate to a selected node in the tree by updating the query parameters.
   * @param node  A node in the material tree
   */
  chooseNode(node) {

    // Reset parameters for parents of the selected node and the node itself
    for (let i = 0; i <= node.level; i++) {
      this.qParams[this.parameterKey(i)] = node.path[i];
    }

    // Empty parameters for possible children of the selected node
    for (let i = node.level + 1; i < this.maximalTreeDepth; i++) {
      this.qParams[this.parameterKey(i)] = null;
    }

    // Update the URL to the new selection
    this._router.navigate([], {queryParams: this.qParams, relativeTo: this._route});
  }

  /**
   * Convert level of a node in the tree to its query parameter key.
   * @param level  The depth, a node is in.
   */
  parameterKey(level): string {
    return this.parameterKeyBase + level;
  }

  /**
   * Convert Knora JSON-LD tree with incoming links into a less deep tree with children directly accessible.
   * @param responseTree  JSON-LD tree from Knora extended search.
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

        const d0ResourceId = responseDepth1[ i ][ '@id' ];
        const d0ResourcePath = [d0ResourceId];

        for (let j = 0; j < responseDepth2.length; j++) {
          if (responseDepth2[j]) {

            const dataDepth2: Array<ResourceNode> = [];
            let responseDepth3: Array<any> = [];
            if (Array.isArray(responseDepth2[ j ][ 'knora-api:linkValueHasSource' ][ 'knora-api:hasIncomingLinkValue' ])) {
              responseDepth3 = responseDepth2[ j ][ 'knora-api:linkValueHasSource' ][ 'knora-api:hasIncomingLinkValue' ];
            } else {
              responseDepth3 = [ responseDepth2[ j ][ 'knora-api:linkValueHasSource' ][ 'knora-api:hasIncomingLinkValue' ] ];
            }

            const d1ResourceId = responseDepth2[ j ][ 'knora-api:linkValueHasSource' ][ '@id' ];
            const d1ResourcePath = d0ResourcePath.concat([d1ResourceId]);

            for (let k = 0; k < responseDepth3.length; k++) {
              if (responseDepth3[ k ]) {

                const dataDepth3: Array<ResourceNode> = [];
                let responseDepth4: Array<any> = [];
                if (Array.isArray(responseDepth3[ k ][ 'knora-api:linkValueHasSource' ][ 'knora-api:hasIncomingLinkValue' ])) {
                  responseDepth4 = responseDepth3[ k ][ 'knora-api:linkValueHasSource' ][ 'knora-api:hasIncomingLinkValue' ];
                } else {
                  responseDepth4 = [ responseDepth3[ k ][ 'knora-api:linkValueHasSource' ][ 'knora-api:hasIncomingLinkValue' ] ];
                }

                const d2ResourceId = responseDepth3[ k ][ 'knora-api:linkValueHasSource' ][ '@id' ];
                const d2ResourcePath = d1ResourcePath.concat([d2ResourceId]);

                for (let l = 0; l < responseDepth4.length; l++) {
                  if (responseDepth4[ l ]) {

                    const dataDepth4: Array<ResourceNode> = [];
                    let responseDepth5: Array<any> = [];
                    if (Array.isArray(responseDepth4[ l ][ 'knora-api:linkValueHasSource' ][ 'knora-api:hasIncomingLinkValue' ])) {
                      responseDepth5 = responseDepth4[ l ][ 'knora-api:linkValueHasSource' ][ 'knora-api:hasIncomingLinkValue' ];
                    } else {
                      responseDepth5 = [ responseDepth4[ l ][ 'knora-api:linkValueHasSource' ][ 'knora-api:hasIncomingLinkValue' ] ];
                    }

                    const d3ResourceId = responseDepth4[ l ][ 'knora-api:linkValueHasSource' ][ '@id' ];
                    const d3ResourcePath = d2ResourcePath.concat([d3ResourceId]);

                    for (let m = 0; m < responseDepth5.length; m++) {
                      if (responseDepth5[ m ]) {

                        const d4ResourceId = responseDepth5[ m ][ 'knora-api:linkValueHasSource' ][ '@id' ];
                        const d4ResourcePath = d3ResourcePath.concat([d4ResourceId]);
                        // TODO Expand here if more levels are needed

                        const d4: ResourceNode = {
                          'label': responseDepth5[ m ][ 'knora-api:linkValueHasSource' ][ 'rdfs:label' ],
                          'identifier': d4ResourceId,
                          'path': d4ResourcePath
                        };
                        dataDepth4.push(d4);
                      }
                    }
                    const d3: ResourceNode = {
                      'children': dataDepth4,
                      'label': responseDepth4[ l ][ 'knora-api:linkValueHasSource' ][ 'rdfs:label' ],
                      'identifier': d3ResourceId,
                      'path': d3ResourcePath
                    };
                    dataDepth3.push(d3);
                  }
                }
                const d2: ResourceNode = {
                  'children': dataDepth3,
                  'label': responseDepth3[ k ][ 'knora-api:linkValueHasSource' ][ 'rdfs:label' ],
                  'identifier': d2ResourceId,
                  'path': d2ResourcePath
                };
                dataDepth2.push(d2);
              }
            }
            const d1: ResourceNode = {
              'children': dataDepth2,
              'label': responseDepth2[ j ][ 'knora-api:linkValueHasSource' ][ 'rdfs:label' ],
              'identifier': d1ResourceId,
              'path': d1ResourcePath
            };
            dataDepth1.push(d1);
          }
        }
        const d0: ResourceNode = {
          'children': dataDepth1,
          'label': responseDepth1[ i ][ 'rdfs:label' ],
          'identifier': d0ResourceId,
          'path': d0ResourcePath
        };
        dataDepth0.push(d0);
      }
    }

    return dataDepth0;
  }

}
