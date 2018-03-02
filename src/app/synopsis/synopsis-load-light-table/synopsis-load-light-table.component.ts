import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-synopsis-load-light-table',
  templateUrl: './synopsis-load-light-table.component.html',
  styleUrls: ['./synopsis-load-light-table.component.scss']
})
export class SynopsisLoadLightTableComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SynopsisLoadLightTableComponent>) { }

  ngOnInit() {
  }

}
