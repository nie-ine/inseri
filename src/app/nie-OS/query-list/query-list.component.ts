import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { QueryService } from '../../shared/nieOS/mongodb/query/query.service';

@Component({
  selector: 'app-query-list',
  templateUrl: './query-list.component.html',
  styleUrls: ['./query-list.component.scss']
})
export class QueryListComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<QueryListComponent>, private queryService: QueryService) { }

  ngOnInit() {
    this.queryService.getAllQueriesOfUser(localStorage.getItem('userId')).subscribe(data => console.log(data));
    this.queryService.getQuery('5c07dbfdff37d7344e1e1479').subscribe(query => console.log(query));
    this.queryService.getAllQueries().subscribe(data => console.log(data));
  }

  close() {
    this.dialogRef.close();
  }

}
