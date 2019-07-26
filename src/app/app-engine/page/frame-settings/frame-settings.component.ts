/**
 * This component is self - explanatory
 * */

import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-frame-settings',
  templateUrl: './frame-settings.component.html',
  styleUrls: ['./frame-settings.component.scss']
})
export class FrameSettingsComponent implements OnInit {
  title: string;
  width: number;
  height: number;
  fullWidth = false;
  fullHeight = false;
  constructor(
    public dialogRef: MatDialogRef<FrameSettingsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit() {
    this.title = this.data[ 0 ];
    this.width = this.data[ 1 ];
    this.height = this.data[ 2 ];
    this.fullWidth = this.data[ 3 ];
    this.fullHeight = this.data[ 4 ];
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(
      [
        this.title,
        this.width,
        this.height,
        this.fullWidth,
        this.fullHeight
      ]
    );
  }

}
