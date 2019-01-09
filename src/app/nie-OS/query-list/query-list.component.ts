import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-query-list',
  templateUrl: './query-list.component.html',
  styleUrls: ['./query-list.component.scss']
})
export class QueryListComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<QueryListComponent>) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

}
