import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'data-list-view',
  templateUrl: './data-list-view.component.html',
})
export class DataListView implements OnInit {
  @Input() queryResponse: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<any>;
  displayedColumns = DISPLAYED_COLUMNS;

  ngOnInit() {
    this.dataSource = new MatTableDataSource(EXAMPLE_DATA);

  }

  ngAfterViewInit(): void {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  dosomething(row_col) {
    console.log(row_col + ' --> Something should happen now like opening some othe app.');
  }

}

// TODO: Replace this with generic data model type
interface DataListView2Item {
  name: string;
  on_thing: string;
}

// TODO: replace this with generic data
const DISPLAYED_COLUMNS = ['name', 'on_thing'];

// TODO: replace this with real data
const EXAMPLE_DATA: DataListView2Item[] = [
  {on_thing: 'Blatt A1', name: 'Augustus'},
  {on_thing: 'Blatt A3', name: 'Caligula'},
  {on_thing: 'Blatt B4', name: 'Caracalla'},
  {on_thing: 'Blatt A6, Blatt D5', name: 'Claudius'},
  {on_thing: 'Blatt C8, Blatt B4', name: 'Domitian'},
  {on_thing: 'Blatt G5, Blatt B4', name: 'Hadrian'},
  {on_thing: 'Blatt D32, Blatt S4', name: 'Marc Aurel'},
  {on_thing: 'Blatt A66, Blatt A4', name: 'Nero'},
  {on_thing: 'Blatt A66, Blatt A4', name: 'Nerva'},
  {on_thing: 'Blatt B44, Blatt G34', name: 'Otho'},
  {on_thing: 'Blatt C88, Blatt BC4', name: 'Titus'},
  {on_thing: 'Blatt A66, Blatt A4', name: 'Vespasian'},
  {on_thing: 'Blatt C88, Blatt BC4', name: 'Vitllius'}

];

