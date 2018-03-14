import {Component} from '@angular/core';
import {SynopsisObjectManagerComponent} from '../synopsis-object-manager/synopsis-object-manager.component';
import {SaveLightTableComponent} from '../save-light-table/save-light-table.component';
import {LoadLightTableComponent} from '../load-light-table/load-light-table.component';
import {MatDialog} from '@angular/material';
import {LightTableLayoutService} from '../light-table-layout.service';
import {ShareLightTableComponent} from '../share-light-table/share-light-table.component';

@Component({
  selector: 'app-light-table-menu',
  templateUrl: './light-table-menu.component.html',
  styleUrls: ['./light-table-menu.component.scss']
})
export class LightTableMenuComponent {

  private tiled = false;
  numberOfColumns = 2;

  constructor(public dialog: MatDialog,
              private lightTableLayoutService: LightTableLayoutService) {
    lightTableLayoutService.tiledLayout$.subscribe(tiled => this.tiled = tiled);
    lightTableLayoutService.numberOfColumns$.subscribe(cols => this.numberOfColumns = cols);
  }

  openAddObjectDialog(): void {
    this.dialog.open(SynopsisObjectManagerComponent, {
      width: '500px'
    });
  }

  openSaveLightTableDialog(): void {
    this.dialog.open(SaveLightTableComponent, {
      width: '500px'
    });
  }

  openLoadLightTableDialog(): void {
    this.dialog.open(LoadLightTableComponent, {
      width: '500px'
    });
  }

  toggleTiledLayout(event) {
    event.stopPropagation();
    this.lightTableLayoutService.tiledLayout(!this.tiled);
  }

  incrementNumberOfColumns(event) {
    event.stopPropagation();
    this.lightTableLayoutService.numberOfColumns(this.numberOfColumns + 1);
  }

  decrementNumberOfColumns(event) {
    event.stopPropagation();
    this.lightTableLayoutService.numberOfColumns(this.numberOfColumns - 1);
  }

  openShareLightTableDialog(): void {
    this.dialog.open(ShareLightTableComponent, {
      width: '500px'
    });
  }

}
