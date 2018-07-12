import {Component, OnInit, Inject, AfterViewChecked, ChangeDetectorRef} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatFormField} from '@angular/material';
import {DataChooserSettingsComponent} from "../data-chooser-settings/data-chooser-settings.component";

@Component({
  selector: 'app-data-chooser',
  templateUrl: './data-chooser.component.html',
  styleUrls: ['./data-chooser.component.scss']
})
export class DataChooserComponent implements OnInit, AfterViewChecked {
  name: string;
  animal: string;
  constructor(
    public dialogSettings: MatDialog,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }
  openDataChooserDialog() {
    console.log('Open Data Chooser Dialog');
    const dialogRef = this.dialogSettings.open(DataChooserSettingsComponent, {
      width: '700px',
      data: { name: this.name, animal: this.animal }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

}
