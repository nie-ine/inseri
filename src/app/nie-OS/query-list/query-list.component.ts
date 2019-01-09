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
    this.getAllQuery();
    // this.queryService.getQuery('5c07dbfdff37d7344e1e1479').subscribe(query => console.log(query));
  }

  getAllQuery() {
    this.queryService.getAllQueriesOfUser(localStorage.getItem('userId')).subscribe(data => {
      this.queries = data.queries;
      console.log(data.queries);
    });
  }

  addQuery(query: any) {
    console.log(query);
  }

  deleteQuery(query: any) {
    this.queryService.deleteQuery(query._id)
      .subscribe((result) => {
        if (result.status === 200) {
          this.getAllQuery();
        }
    });
  }

  openQueryEntry(item: any) {

  }

  close() {
    this.dialogRef.close();
  }

}
