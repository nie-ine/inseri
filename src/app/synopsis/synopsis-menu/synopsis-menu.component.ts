import {Component} from '@angular/core';
import {SynopsisObjectManagerComponent} from '../synopsis-object-manager/synopsis-object-manager.component';
import {SynopsisSaveLightTableComponent} from '../synopsis-save-light-table/synopsis-save-light-table.component';
import {SynopsisLoadLightTableComponent} from '../synopsis-load-light-table/synopsis-load-light-table.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-synopsis-menu',
  templateUrl: './synopsis-menu.component.html',
  styleUrls: ['./synopsis-menu.component.scss']
})
export class SynopsisMenuComponent {

  constructor(public dialog: MatDialog) {
  }

  openAddObjectDialog(): void {
    this.dialog.open(SynopsisObjectManagerComponent, {
      width: '500px'
    });
  }

  openSaveLightTableDialog(): void {
    this.dialog.open(SynopsisSaveLightTableComponent, {
      width: '500px'
    });
  }

  openLoadLightTableDialog(): void {
    this.dialog.open(SynopsisLoadLightTableComponent, {
      width: '500px'
    });
  }

}
