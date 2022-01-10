import {Component, ViewChild} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {SynopsisObjectSerializerService} from '../synopsis-object-serializer.service';
import {SynopsisObjectData} from '../synopsis-object-data';
import {LightTableLayoutService} from '../light-table-layout.service';

@Component({
  selector: 'app-share-light-table',
  templateUrl: './share-light-table.component.html',
  styleUrls: ['./share-light-table.component.scss']
})
export class ShareLightTableComponent {

  @ViewChild('url', { static: true }) textarea;
  shareUrl: string;
  showButton = false;
  private tiled = false;
  private numberOfColumns = 2;

  constructor(public dialogRef: MatDialogRef<ShareLightTableComponent>,
              private synopsisObjectSerializerService: SynopsisObjectSerializerService,
              private lightTableLayoutService: LightTableLayoutService) {
    lightTableLayoutService.tiledLayout$.subscribe(tiled => this.tiled = tiled);
    lightTableLayoutService.numberOfColumns$.subscribe(cols => this.numberOfColumns = cols);
    synopsisObjectSerializerService.propagateLightTableSharedSnapshot$.subscribe(objs => this.encodeUrl(objs));
    synopsisObjectSerializerService.generateSharedSnapshot();
  }

  copyToClipboardAndClose() {
    this.textarea.nativeElement.select();
    document.execCommand('copy');
    this.dialogRef.close();
  }

  setShowButton(flag: boolean) {
    this.showButton = flag;
  }

  private encodeUrl(objs: [SynopsisObjectData[], SynopsisObjectData[]]) {
    this.shareUrl = window.location.href +
      ';tiled=' + this.tiled +
      (this.tiled ? ';cols=' + this.numberOfColumns : '') +
      ';snapshot=' + encodeURIComponent(JSON.stringify(objs));
  }

}
