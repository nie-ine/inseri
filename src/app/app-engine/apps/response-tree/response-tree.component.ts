import {Input, OnInit, OnChanges, EventEmitter, Output} from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {Component, Injectable} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {BehaviorSubject, Observable, of as observableOf} from 'rxjs';
import {GeneratePathService} from '../../../query-app-interface/data-management/response-tree/generate-path.service';

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
    // console.log('Initialisation of the database');
    // Parse the string to json object.
    // console.log(inputData);
    // console.log( JSON.stringify(inputData) );
    const dataObject = JSON.parse( JSON.stringify(inputData) );

    // Build the tree nodes from Json object. The result is a list of `FileNode` with nested
    //     file node as children.
    const data = this.buildFileTree(
      dataObject,
      0
    );

    // Notify the change.
    // console.log( 'Notify the change', data );
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
  selector: 'response-tree',
  templateUrl: './response-tree.component.html'
})
export class ResponseTreeComponent implements OnChanges {
  treeControl: FlatTreeControl<FileFlatNode>;
  treeFlattener: MatTreeFlattener<FileNode, FileFlatNode>;
  dataSource: MatTreeFlatDataSource<FileNode, FileFlatNode>;
  mapping: any = {};
  @Input() queryResponse: any;
  @Input() chosenInputs: Array<any>;
  @Output() sendMappingBackToQueryAppInputMap: EventEmitter<any> = new EventEmitter<any>();
  database: any;
  index: number;
  indiceEntered = false;
  constructor(
    database: FileDatabase,
    private generatePathService: GeneratePathService) {
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
  ngOnChanges() {
    // console.log('Query Response:');
    // console.log( this.queryResponse );
    if ( this.queryResponse === undefined ) {
      this.queryResponse = {
        'no': {
          'input': 'given',
          'for': ['this', 'app']
        }
      };
    }
    if ( this.queryResponse ) {
      this.database.initialize( this.queryResponse );
    }
  }

  transformer = (node: FileNode, level: number) => {
    return new FileFlatNode(
      !!node.children,
      node.filename,
      level,
      node.type
    );
  };

  chooseChip( hash: string, input: string ) {
    this.mapping[ input ] = this.generatePathService.generatePath( hash , this.queryResponse );
    this.mapping[ input ].hash = hash;
    console.log( this.mapping, input );
    this.sendMappingBackToQueryAppInputMap.emit( this.mapping );
  }

  private _getLevel = (node: FileFlatNode) => node.level;

  private _isExpandable = (node: FileFlatNode) => node.expandable;

  private _getChildren = (node: FileNode): Observable<FileNode[]> => observableOf(node.children);

  hasChild = (_: number, _nodeData: FileFlatNode) => _nodeData.expandable;

  checkIfNotTrue(mapping: any, input: string, nodeType: string) {
    console.log( 'checkIfNottrue', mapping, input, nodeType );
    return true;
  }

  addIndexToMappin( index: number , input: string ) {
    if( !this.indiceEntered ) {
      this.mapping[ input ].push( index );
      this.indiceEntered = true;
    } else {
      this.mapping[ input ][ this.mapping[ input ].length - 1 ] = index;
    }
    console.log(this.mapping[ input ]);
    this.sendMappingBackToQueryAppInputMap.emit( this.mapping );
  }

}
