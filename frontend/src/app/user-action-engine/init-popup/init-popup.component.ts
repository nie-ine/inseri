import {ChangeDetectorRef, Component, Inject} from '@angular/core';
import {InitService} from './service/init.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-init-popup',
  templateUrl: './init-popup.component.html',
  styleUrls: ['./init-popup.component.scss']
})
export class InitPopupComponent  {
  public message = {
    german: 'Diese Seite ist derzeit im Beta - Stadium und ausschliesslich zu Testzwecken zu gebrauchen.',
    english: 'Here will be the English text',
    french: 'Here will be the French text',
    italian: 'Here will be the Italian text'
  };

  constructor(public dialogRef: MatDialogRef<InitPopupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private initPopUp: InitService,
              private cdr: ChangeDetectorRef) { }

  close() {
    this.initPopUp.appLaunched();
    this.dialogRef.close();
  }

}
