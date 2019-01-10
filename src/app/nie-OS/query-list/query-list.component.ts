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
  displayedColumns = ['add', 'title', 'description', 'delete'];
  deletingQueries: any[] = [];

  constructor(public dialogRef: MatDialogRef<QueryListComponent>, private queryService: QueryService) { }

  ngOnInit() {
    this.queryService.getAllQueriesOfUser(localStorage.getItem('userId')).subscribe(data => {
      this.queries = data.queries;
    });
    // this.queryService.getQuery('5c07dbfdff37d7344e1e1479').subscribe(query => console.log(query));
  }

  slice(description: string): string {
    return description.length > 120 ? (description.slice(0, 120)).concat('...') : description;
  }

  addQuery(query: any) {
    console.log(query);
  }

  deleteQuery(query: any) {
    this.deletingQueries.push(query._id);
    this.queryService.deleteQuery(query._id)
      .subscribe((result) => {
        if (result.status === 200) {
          this.queryService.getAllQueriesOfUser(localStorage.getItem('userId')).subscribe(data => {
            this.deletingQueries = this.deletingQueries.filter(element => element !== query._id);
            this.queries = data.queries;
          });
        } else {
          this.deletingQueries = this.deletingQueries.filter(element => element !== query._id);
        }
    });
  }

  openQueryEntry(item: any) {

  }

  close() {
    this.dialogRef.close();
  }

}
