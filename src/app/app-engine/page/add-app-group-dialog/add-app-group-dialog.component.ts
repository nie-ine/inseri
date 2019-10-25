import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-add-app-group-dialog',
  templateUrl: './add-app-group-dialog.component.html'
})
export class AddAppGroupDialogComponent implements OnInit {
  openAppArray = [];
  constructor(
    public dialogRef: MatDialogRef<AddAppGroupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    console.log( this.data );
    this.generateOpenApps( this.data.openAppsInThisPage );
  }

  generateOpenApps( openApps: any ) {
    for ( const appType in openApps ) {
      for ( const app of openApps[ appType ].model ) {
        console.log( app );
        if ( app.x ) {
          this.openAppArray.push(app);
        }
      }
    }
  }

  onNoClick(  ): void {
    this.dialogRef.close();
  }

}
