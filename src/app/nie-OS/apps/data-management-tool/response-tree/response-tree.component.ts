import {Input, OnInit} from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {Component, Injectable} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {BehaviorSubject, Observable, of as observableOf} from 'rxjs';

/**
 * File node data with nested structure.
 * Each node has a filename, and a type or a list of children.
 */
export class FileNode {
  children: FileNode[];
  filename: string;
  type: any;
}

/** Flat node with expandable and level information */
export class FileFlatNode {
  constructor(
    public expandable: boolean, public filename: string, public level: number, public type: any) {}
}

/**
 * The file structure tree data in string. The data could be parsed into a Json object
 */
const TREE_DATA = JSON.stringify({
  "@graph": [
    {
      "@id": "http://rdfh.ch/6fad5b8c1e03",
      "@type": "incunabula:book",
      "incunabula:citation": [
        {
          "@id": "http://rdfh.ch/6fad5b8c1e03/values/99a7549e6a0c",
          "@type": "knora-api:TextValue",
          "knora-api:valueAsString": "Van der Haegen I: 22,30"
        },
        {
          "@id": "http://rdfh.ch/6fad5b8c1e03/values/5cd1a7d76a0c",
          "@type": "knora-api:TextValue",
          "knora-api:valueAsString": "Goff P142"
        },
        {
          "@id": "http://rdfh.ch/6fad5b8c1e03/values/1ffbfa106b0c",
          "@type": "knora-api:TextValue",
          "knora-api:valueAsString": "H 12453*"
        },
        {
          "@id": "http://rdfh.ch/6fad5b8c1e03/values/e2244e4a6b0c",
          "@type": "knora-api:TextValue",
          "knora-api:valueAsString": "Pellechet Ms 9031 (8884)"
        },
        {
          "@id": "http://rdfh.ch/6fad5b8c1e03/values/a54ea1836b0c",
          "@type": "knora-api:TextValue",
          "knora-api:valueAsString": "CIBN P-41"
        },
        {
          "@id": "http://rdfh.ch/6fad5b8c1e03/values/6878f4bc6b0c",
          "@type": "knora-api:TextValue",
          "knora-api:valueAsString": "Polain, Belgique 2992"
        },
        {
          "@id": "http://rdfh.ch/6fad5b8c1e03/values/2ba247f66b0c",
          "@type": "knora-api:TextValue",
          "knora-api:valueAsString": "IDL 1000"
        },
        {
          "@id": "http://rdfh.ch/6fad5b8c1e03/values/eecb9a2f6c0c",
          "@type": "knora-api:TextValue",
          "knora-api:valueAsString": "Sajó-Soltész 784"
        },
        {
          "@id": "http://rdfh.ch/6fad5b8c1e03/values/b1f5ed686c0c",
          "@type": "knora-api:TextValue",
          "knora-api:valueAsString": "Pollard, Morgan 231"
        },
        {
          "@id": "http://rdfh.ch/6fad5b8c1e03/values/741f41a26c0c",
          "@type": "knora-api:TextValue",
          "knora-api:valueAsString": "Voulliéme, Berlin 572"
        },
        {
          "@id": "http://rdfh.ch/6fad5b8c1e03/values/374994db6c0c",
          "@type": "knora-api:TextValue",
          "knora-api:valueAsString": "Schreiber, Manuel 4607"
        },
        {
          "@id": "http://rdfh.ch/6fad5b8c1e03/values/fa72e7146d0c",
          "@type": "knora-api:TextValue",
          "knora-api:valueAsString": "Schramm XXII p. 43"
        },
        {
          "@id": "http://rdfh.ch/6fad5b8c1e03/values/bd9c3a4e6d0c",
          "@type": "knora-api:TextValue",
          "knora-api:valueAsString": "Sheppard 2519, 2520"
        },
        {
          "@id": "http://rdfh.ch/6fad5b8c1e03/values/80c68d876d0c",
          "@type": "knora-api:TextValue",
          "knora-api:valueAsString": "Proctor 7731"
        },
        {
          "@id": "http://rdfh.ch/6fad5b8c1e03/values/43f0e0c06d0c",
          "@type": "knora-api:TextValue",
          "knora-api:valueAsString": "BMC III 784"
        },
        {
          "@id": "http://rdfh.ch/6fad5b8c1e03/values/061a34fa6d0c",
          "@type": "knora-api:TextValue",
          "knora-api:valueAsString": "BSB P-27"
        }
      ],
      "incunabula:description": {
        "@id": "http://rdfh.ch/6fad5b8c1e03/values/bfb10fb60123",
        "@type": "knora-api:TextValue",
        "knora-api:valueAsString": "Blattgrösse: ca. 20,0 x 15,0 cm"
      },
      "incunabula:hasAuthor": [
        {
          "@id": "http://rdfh.ch/6fad5b8c1e03/values/38dcc127680c",
          "@type": "knora-api:TextValue",
          "knora-api:valueAsString": "Meynradus Sanctus"
        },
        {
          "@id": "http://rdfh.ch/6fad5b8c1e03/values/fb051561680c",
          "@type": "knora-api:TextValue",
          "knora-api:valueAsString": "Albrecht von Bonstetten"
        },
        {
          "@id": "http://rdfh.ch/6fad5b8c1e03/values/df94728137630b",
          "@type": "knora-api:TextValue",
          "knora-api:valueAsString": "sss"
        }
      ],
      "incunabula:publoc": {
        "@id": "http://rdfh.ch/6fad5b8c1e03/values/8159bbd3680c",
        "@type": "knora-api:TextValue",
        "knora-api:valueAsString": "Basel"
      },
      "incunabula:title": {
        "@id": "http://rdfh.ch/6fad5b8c1e03/values/75b26eee670c",
        "@type": "knora-api:TextValue",
        "knora-api:valueAsString": "Passio sancti Meynrhadi martyris et heremite"
      },
      "rdfs:label": "Passio sancti Meynrhadi martyris et heremite"
    },
    {
      "@id": "http://rdfh.ch/b6b5ff1eb703",
      "@type": "incunabula:book",
      "incunabula:citation": [
        {
          "@id": "http://rdfh.ch/b6b5ff1eb703/values/a868f5fad30e",
          "@type": "knora-api:TextValue",
          "knora-api:valueAsString": "Van der Haegen I: 28,13"
        },
        {
          "@id": "http://rdfh.ch/b6b5ff1eb703/values/6b924834d40e",
          "@type": "knora-api:TextValue",
          "knora-api:valueAsString": "Goff B1090"
        },
        {
          "@id": "http://rdfh.ch/b6b5ff1eb703/values/2ebc9b6dd40e",
          "@type": "knora-api:TextValue",
          "knora-api:valueAsString": "HC 3750*"
        },
        {
          "@id": "http://rdfh.ch/b6b5ff1eb703/values/f1e5eea6d40e",
          "@type": "knora-api:TextValue",
          "knora-api:valueAsString": "GfT 497, 498, 1038"
        },
        {
          "@id": "http://rdfh.ch/b6b5ff1eb703/values/b40f42e0d40e",
          "@type": "knora-api:TextValue",
          "knora-api:valueAsString": "Schr 3571"
        },
        {
          "@id": "http://rdfh.ch/b6b5ff1eb703/values/77399519d50e",
          "@type": "knora-api:TextValue",
          "knora-api:valueAsString": "Schramm XXII p. 47"
        },
        {
          "@id": "http://rdfh.ch/b6b5ff1eb703/values/3a63e852d50e",
          "@type": "knora-api:TextValue",
          "knora-api:valueAsString": "Pell 2822"
        },
        {
          "@id": "http://rdfh.ch/b6b5ff1eb703/values/fd8c3b8cd50e",
          "@type": "knora-api:TextValue",
          "knora-api:valueAsString": "CIBN B-759"
        },
        {
          "@id": "http://rdfh.ch/b6b5ff1eb703/values/c0b68ec5d50e",
          "@type": "knora-api:TextValue",
          "knora-api:valueAsString": "Hillard 482"
        },
        {
          "@id": "http://rdfh.ch/b6b5ff1eb703/values/83e0e1fed50e",
          "@type": "knora-api:TextValue",
          "knora-api:valueAsString": "Péligry 221"
        },
        {
          "@id": "http://rdfh.ch/b6b5ff1eb703/values/460a3538d60e",
          "@type": "knora-api:TextValue",
          "knora-api:valueAsString": "Delisle 329"
        },
        {
          "@id": "http://rdfh.ch/b6b5ff1eb703/values/09348871d60e",
          "@type": "knora-api:TextValue",
          "knora-api:valueAsString": "Polain(B) 4247"
        },
        {
          "@id": "http://rdfh.ch/b6b5ff1eb703/values/cc5ddbaad60e",
          "@type": "knora-api:TextValue",
          "knora-api:valueAsString": "IBE 1170"
        },
        {
          "@id": "http://rdfh.ch/b6b5ff1eb703/values/8f872ee4d60e",
          "@type": "knora-api:TextValue",
          "knora-api:valueAsString": "IGI 2048"
        },
        {
          "@id": "http://rdfh.ch/b6b5ff1eb703/values/52b1811dd70e",
          "@type": "knora-api:TextValue",
          "knora-api:valueAsString": "IBP 1238"
        },
        {
          "@id": "http://rdfh.ch/b6b5ff1eb703/values/15dbd456d70e",
          "@type": "knora-api:TextValue",
          "knora-api:valueAsString": "Mendes 289"
        },
        {
          "@id": "http://rdfh.ch/b6b5ff1eb703/values/d8042890d70e",
          "@type": "knora-api:TextValue",
          "knora-api:valueAsString": "Sallander 1652"
        },
        {
          "@id": "http://rdfh.ch/b6b5ff1eb703/values/9b2e7bc9d70e",
          "@type": "knora-api:TextValue",
          "knora-api:valueAsString": "Madsen 863"
        },
        {
          "@id": "http://rdfh.ch/b6b5ff1eb703/values/5e58ce02d80e",
          "@type": "knora-api:TextValue",
          "knora-api:valueAsString": "Voull(B) 610"
        },
        {
          "@id": "http://rdfh.ch/b6b5ff1eb703/values/2182213cd80e",
          "@type": "knora-api:TextValue",
          "knora-api:valueAsString": "Voull(Trier) 279"
        },
        {
          "@id": "http://rdfh.ch/b6b5ff1eb703/values/e4ab7475d80e",
          "@type": "knora-api:TextValue",
          "knora-api:valueAsString": "Hubay(Augsburg) 461"
        },
        {
          "@id": "http://rdfh.ch/b6b5ff1eb703/values/a7d5c7aed80e",
          "@type": "knora-api:TextValue",
          "knora-api:valueAsString": "Hubay(Würzburg) 513"
        },
        {
          "@id": "http://rdfh.ch/b6b5ff1eb703/values/6aff1ae8d80e",
          "@type": "knora-api:TextValue",
          "knora-api:valueAsString": "Sack(Freiburg) 810"
        },
        {
          "@id": "http://rdfh.ch/b6b5ff1eb703/values/2d296e21d90e",
          "@type": "knora-api:TextValue",
          "knora-api:valueAsString": "Walsh 1260"
        },
        {
          "@id": "http://rdfh.ch/b6b5ff1eb703/values/f052c15ad90e",
          "@type": "knora-api:TextValue",
          "knora-api:valueAsString": "Oates 2853"
        },
        {
          "@id": "http://rdfh.ch/b6b5ff1eb703/values/b37c1494d90e",
          "@type": "knora-api:TextValue",
          "knora-api:valueAsString": "BSB-Ink B-820"
        },
        {
          "@id": "http://rdfh.ch/b6b5ff1eb703/values/76a667cdd90e",
          "@type": "knora-api:TextValue",
          "knora-api:valueAsString": "GW 5061"
        }
      ],
      "incunabula:description": {
        "@id": "http://rdfh.ch/b6b5ff1eb703/values/f3747068f624",
        "@type": "knora-api:TextValue",
        "knora-api:valueAsString": "Beschreibung fehlt!"
      },
      "incunabula:hasAuthor": {
        "@id": "http://rdfh.ch/b6b5ff1eb703/values/6c257680cf0e",
        "@type": "knora-api:TextValue",
        "knora-api:valueAsString": "Sebastian Brant"
      },
      "incunabula:publoc": {
        "@id": "http://rdfh.ch/b6b5ff1eb703/values/f2781cf3cf0e",
        "@type": "knora-api:TextValue",
        "knora-api:valueAsString": "Basel"
      },
      "incunabula:title": [
        {
          "@id": "http://rdfh.ch/b6b5ff1eb703/values/e6d1cf0dcf0e",
          "@type": "knora-api:TextValue",
          "knora-api:valueAsString": "[Das] Narrenschiff (lat.)"
        },
        {
          "@id": "http://rdfh.ch/b6b5ff1eb703/values/a9fb2247cf0e",
          "@type": "knora-api:TextValue",
          "knora-api:valueAsString": "Stultifera navis (...)"
        }
      ],
      "rdfs:label": "[Das] Narrenschiff (lat.)"
    }
  ],
  "@context": {
    "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
    "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
    "knora-api": "http://api.knora.org/ontology/knora-api/v2#",
    "incunabula": "http://0.0.0.0:3333/ontology/0803/incunabula/v2#"
  }
});

/**
 * File database, it can build a tree structured Json object from string.
 * Each node in Json object represents a file or a directory. For a file, it has filename and type.
 * For a directory, it has filename and children (a list of files or directories).
 * The input will be a json object string, and the output is a list of `FileNode` with nested
 * structure.
 */
@Injectable()
export class FileDatabase {
  dataChange = new BehaviorSubject<FileNode[]>([]);

  get data(): FileNode[] {
    return this.dataChange.value;
  }

  constructor() {
  }

  initialize( inputData: any ) {
    console.log('Initialisation of the database');
    // Parse the string to json object.
    console.log(inputData);
    console.log( JSON.stringify(inputData) );
    const dataObject = JSON.parse( JSON.stringify(inputData) );

    // Build the tree nodes from Json object. The result is a list of `FileNode` with nested
    //     file node as children.
    const data = this.buildFileTree(
      dataObject,
      0
    );

    // Notify the change.
    this.dataChange.next(data);
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `FileNode`.
   */
  buildFileTree(obj: object, level: number): FileNode[] {
    return Object.keys(obj).reduce<FileNode[]>((accumulator, key) => {
      const value = obj[key];
      const node = new FileNode();
      node.filename = key;

      if (value != null) {
        if (typeof value === 'object') {
          node.children = this.buildFileTree(value, level + 1);
        } else {
          node.type = value;
        }
      }

      return accumulator.concat(node);
    }, []);
  }
}


@Component({
  selector: 'app-response-tree',
  templateUrl: './response-tree.component.html',
  styleUrls: ['./response-tree.component.scss']
})
export class ResponseTreeComponent implements OnInit {

  treeControl: FlatTreeControl<FileFlatNode>;
  treeFlattener: MatTreeFlattener<FileNode, FileFlatNode>;
  dataSource: MatTreeFlatDataSource<FileNode, FileFlatNode>;
  @Input() queryResponse: any;
  database: any;
  constructor(database: FileDatabase) {
    this.database = database;
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this._getLevel,
      this._isExpandable,
      this._getChildren
    );
    this.treeControl = new FlatTreeControl<FileFlatNode>(
      this._getLevel,
      this._isExpandable
    );
    this.dataSource = new MatTreeFlatDataSource(
      this.treeControl,
      this.treeFlattener
    );

    database.dataChange.subscribe(data => this.dataSource.data = data);
  }
  ngOnInit() {
    console.log('Query Response:');
    console.log( this.queryResponse );
    this.database.initialize( this.queryResponse );
  }

  transformer = (node: FileNode, level: number) => {
    return new FileFlatNode(
      !!node.children,
      node.filename,
      level,
      node.type
    );
  }

  private _getLevel = (node: FileFlatNode) => node.level;

  private _isExpandable = (node: FileFlatNode) => node.expandable;

  private _getChildren = (node: FileNode): Observable<FileNode[]> => observableOf(node.children);

  hasChild = (_: number, _nodeData: FileFlatNode) => _nodeData.expandable;

}
