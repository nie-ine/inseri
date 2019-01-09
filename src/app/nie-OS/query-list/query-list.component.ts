import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MongoQueryService } from '../../shared/nieOS/mongodb/query/query.service';

@Component({
  selector: 'app-query-list',
  templateUrl: './query-list.component.html',
  styleUrls: ['./query-list.component.scss']
})
export class QueryListComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<QueryListComponent>, private queryService: MongoQueryService) { }

  ngOnInit() {
    this.queryService.getAllQueries().subscribe(data => console.log(data));
    this.queryService.getQuery('5c07dbfdff37d7344e1e1479').subscribe(query => console.log(query));
  }

  close() {
    this.dialogRef.close();
  }

}
