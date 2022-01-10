import {Component, Inject, OnInit} from '@angular/core';
import {QueryService} from '../../../user-action-engine/mongodb/query/query.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-file-list-dialog',
  templateUrl: './file-list-dialog.component.html'
})
export class FileListDialogComponent implements OnInit {
  queries: any;
  queriesWithJSONMethod = [];
  value: any;
  displayedColumns = [ 'title', 'description', 'add', 'delete'];
  deletingQueries: any[] = [];
  constructor(
    public dialogRef: MatDialogRef<FileListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private queryService: QueryService
  ) { }

  ngOnInit() {
    this.updateQueryList();
  }

  onNoClick( output?: any ): void {
    this.dialogRef.close( output );
  }

  updateQueryList() {
    this.queryService.getAllQueriesOfUser(localStorage.getItem('userId')).subscribe(data => {
      for ( let i = data.queries.length - 1; i >= 0; i-- ) {
        if ( data.queries[ i ] && data.queries[ i ].method === 'JSON' ) {
          this.queriesWithJSONMethod.push( data.queries[ i ] );
        }
      }
      this.queries = new MatTableDataSource(this.queriesWithJSONMethod);
    });
  }

  applyFilter(filterValue: string) {
    this.queries.filter = filterValue.trim().toLowerCase();
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
}
