import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-synopsis-save-light-table',
  templateUrl: './synopsis-save-light-table.component.html',
  styleUrls: ['./synopsis-save-light-table.component.scss']
})
export class SynopsisSaveLightTableComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SynopsisSaveLightTableComponent>) { }

  ngOnInit() {
  }

}
