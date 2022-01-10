import {HttpClient} from '@angular/common/http';
import {Input, OnInit, OnChanges, EventEmitter, Output, ChangeDetectorRef, AfterViewChecked} from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {Component, Injectable} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {BehaviorSubject, Observable, of as observableOf} from 'rxjs';
import {GeneratePathService} from '../../../query-app-interface/data-management/response-tree/generate-path.service';
import {ActivatedRoute} from '@angular/router';

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
export class FileFlatNodeGnd {
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
export class FileDatabaseForAppGND {
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
  selector: 'app-gnd-lobid',
  templateUrl: './gnd-lobid.component.html',
  styleUrls: ['./gnd-lobid.component.scss']
})
export class GndLobidComponent implements AfterViewChecked {
  treeControl: FlatTreeControl<FileFlatNodeGnd>;
  treeFlattener: MatTreeFlattener<FileNode, FileFlatNodeGnd>;
  dataSource: MatTreeFlatDataSource<FileNode, FileFlatNodeGnd>;
  mapping: any = {};
  queryResponse: any;
  @Input() chosenInputs: Array<any>;
  @Output() sendMappingBackToQueryAppInputMap: EventEmitter<any> = new EventEmitter<any>();
  database: any;
  index: number;
  indiceEntered = false;
  gnd: string;
  constructor(
    private cdr: ChangeDetectorRef,
    public route: ActivatedRoute,
    private http: HttpClient,
    database: FileDatabaseForAppGND,
    private generatePathService: GeneratePathService) {
    this.database = database;
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this._getLevel,
      this._isExpandable,
      this._getChildren
    );
    this.treeControl = new FlatTreeControl<FileFlatNodeGnd>(
      this._getLevel,
      this._isExpandable
    );
    this.dataSource = new MatTreeFlatDataSource(
      this.treeControl,
      this.treeFlattener
    );

    database.dataChange.subscribe(data => this.dataSource.data = data);
  }

  ngAfterViewChecked() {
    // console.log( 'check' );
    this.cdr.detectChanges();
    if ( this.gnd !==  this.route.snapshot.queryParams.gnd ) {
      this.gnd = this.route.snapshot.queryParams.gnd;
      this.http.get( 'http://lobid.org/gnd/' + this.gnd + '.json' )
        .subscribe(
          data => {
            console.log( data );
            this.queryResponse = data;
            this.database.initialize( this.queryResponse );
          }, error => {
            console.log( error );
          });
    }
    this.cdr.detectChanges();
  }

  transformer = (node: FileNode, level: number) => {
    return new FileFlatNodeGnd(
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

  private _getLevel = (node: FileFlatNodeGnd) => node.level;

  private _isExpandable = (node: FileFlatNodeGnd) => node.expandable;

  private _getChildren = (node: FileNode): Observable<FileNode[]> => observableOf(node.children);

  hasChild = (_: number, _nodeData: FileFlatNodeGnd) => _nodeData.expandable;

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
