import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { QueryService } from '../../shared/nieOS/mongodb/query/query.service';

@Component({
  selector: 'app-query-list',
  templateUrl: './query-list.component.html',
  styleUrls: ['./query-list.component.scss']
})
export class QueryListComponent implements OnInit {
  queries: any;
  displayedColumns = ['add', 'title', 'delete'];

  constructor(public dialogRef: MatDialogRef<QueryListComponent>, private queryService: QueryService) { }

  ngOnInit() {
    this.queryService.getAllQueriesOfUser(localStorage.getItem('userId')).subscribe(data => {
      this.queries = data.queries;
      console.log(data.queries);
    });
    // this.queryService.getQuery('5c07dbfdff37d7344e1e1479').subscribe(query => console.log(query));
  }

  add(item: any) {
    console.log(item);
  }

  openQueryEntry(item: any) {

  }

  close() {
    this.dialogRef.close();
  }

}
