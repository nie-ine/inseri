import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {Router, NavigationEnd, ActivatedRoute} from '@angular/router';
import { ActionService } from '../../../shared/action.service';
import { AlertService} from '../../../shared/altert.service';
import { HttpParams } from '@angular/common/http';
import {EditionService} from "../model/edition.service";
import {GenerateHashService} from "../../../shared/generateHash.service";

@Component({
  selector: 'app-edition-landing-page',
  templateUrl: './edition-landing-page.component.html',
  styleUrls: ['./edition-landing-page.component.scss']
})
export class EditionLandingPageComponent implements OnInit {

  animal: string;
  name: string;
  actionID: number;
  edition: any;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private editionService: EditionService,
    private generateHashService: GenerateHashService
  ) { }

  ngOnInit() {
    console.log('Check if edition for this action exists');
    this.actionID = this.route.snapshot.queryParams.actionID;
    this.checkIfEditionExists( this.actionID );
  }
  checkIfEditionExists( actionID: number ) {
    console.log('Check if editions exist');
    this.editionService.getAll()
      .subscribe(
        data => {
          console.log('All Editions: ');
          console.log( data );
          if( data && data.length ) {
            console.log('editions exist');
          } else {
            console.log('no editions exist yet - create edition');
            this.edition = {};
            this.edition.title = 'Please change title here';
            this.edition.description = 'Please edit description here';
            this.edition.linkToImage = 'Please choose image here';
            this.edition.hash = this.generateHashService.generateHash();
            console.log( this.edition.hash );
            this.editionService.create( this.edition )
              .subscribe(
                data2 => {
                  console.log(data2);
                },
                error2 => {
                  console.log(error2);
                }
              );
          }
        },
        error => {
          console.log(error);
          return undefined;
        });
  }



  openDialog() {
    const dialogRef = this.dialog.open(DialogCreateNewViewComponent, {
      width: '700px',
      data: { name: this.name, animal: this.animal }
    });
  }

}

@Component({
  selector: 'dialog-create-new-view',
  templateUrl: './dialog-create-new-view.html',
})
export class DialogCreateNewViewComponent {
  model: any = {};
  loading = false;
  chooseNewAction: string;
  constructor(public dialogRef: MatDialogRef<DialogCreateNewViewComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private router: Router,
              private actionService: ActionService) {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  register() {
    this.loading = true;
    this.actionService.create(this.model)
      .subscribe(
        data => {
          console.log('Action created');
          const actions = JSON.parse(localStorage.getItem('actions')) || [];
          console.log(actions);
          this.onNoClick();
          console.log(this.model.type.search('salsah'));
          if ( this.model.type.search('salsah') !== -1 ) {
            console.log('Navigate to Salsah');
            window.open('http://salsah2.nie-ine.ch/', '_blank');
          } else {
            const params = new HttpParams().set('actionId', actions.lengt);
            params.append('actionId', actions.length);
            this.router.navigate( [ this.model.type ], { queryParams: { 'actionID': actions.length } } );
          }
        },
        error => {
          console.log(error);
          this.loading = false;
        });
  }
}
