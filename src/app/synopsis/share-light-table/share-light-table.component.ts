import { Component, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { SynopsisObjectSerializerService } from '../synopsis-object-serializer.service';
import { SynopsisObjectData } from '../synopsis-object-data';

@Component({
  selector: 'app-share-light-table',
  templateUrl: './share-light-table.component.html',
  styleUrls: ['./share-light-table.component.scss']
})
export class ShareLightTableComponent {

  shareUrl: string;
  showButton = false;
  @ViewChild('url') textarea;

  constructor(public dialogRef: MatDialogRef<ShareLightTableComponent>,
              private synopsisObjectSerializerService: SynopsisObjectSerializerService) {
    synopsisObjectSerializerService.propagateLightTableSharedSnapshot$.subscribe(objs => this.encodeUrl(objs));
    this.synopsisObjectSerializerService.generateSharedSnapshot();
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
    this.shareUrl = window.location.href + ';snapshot=' + encodeURIComponent(JSON.stringify(objs));
  }

}
