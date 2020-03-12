/**
 * This component displays the list of queries saved by a user.
 * it can be generated from the dashboard by the user by clicking on
 * "show" all queries
 * */

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { QueryService } from '../../user-action-engine/mongodb/query/query.service';
import { QueryEntryComponent } from '../query-entry/query-entry.component';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-query-list',
  templateUrl: './query-list.component.html',
  styleUrls: ['./query-list.component.scss']
})
export class QueryListComponent implements OnInit {
  queries: any;
  displayedColumns = ['add', 'edit', 'title', 'description', 'delete'];
  deletingQueries: any[] = [];
  value: any;

  constructor(
    public dialogRef: MatDialogRef<QueryListComponent>,
    private queryService: QueryService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.updateQueryList();
  }

  slice(description: string): string {
    if (description) {
      return description.length > 120 ? (description.slice(0, 120)).concat('...') : description;
    } else {
      return '[no description]';
    }
  }

  createNewQuery(value: any) {
    this.queryService.createQuery({title: value})
      .subscribe(data => {
        console.log(data);
        if (data.status === 201) {
          this.updateQueryList();
        }
      });
  }

  updateQueryList() {
    this.queryService.getAllQueriesOfUser(localStorage.getItem('userId')).subscribe(data => {
      this.queries = new MatTableDataSource( data.queries.slice().reverse() );
    });
  }

  addQuery(query: any) {
    this.dialogRef.close(query);
  }

  deleteQuery(query: any) {
    this.deletingQueries.push(query._id);
    this.queryService.deleteQuery(query._id)
      .subscribe((result) => {
        if (result.status === 200) {
          this.queryService.getAllQueriesOfUser(localStorage.getItem('userId')).subscribe(data => {
            this.deletingQueries = this.deletingQueries.filter(element => element !== query._id);
            this.queries = new MatTableDataSource(data.queries);
          });
        } else {
          this.deletingQueries = this.deletingQueries.filter(element => element !== query._id);
        }
    });
  }

  editQuery(query: any) {
    const dialogRef = this.dialog.open(QueryEntryComponent, {
      width: '100%',
      height: '100%',
      data: {
        query: query,
        pageID: null
      }
    });
  }

  applyFilter(filterValue: string) {
    this.queries.filter = filterValue.trim().toLowerCase();
  }

  close() {
    this.dialogRef.close();
  }

}
