import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {Router, NavigationEnd, ActivatedRoute} from '@angular/router';
import { ActionService } from '../../../shared/action.service';
import { AlertService} from '../../../shared/altert.service';
import { HttpParams } from '@angular/common/http';
import {EditionService} from "../model/edition.service";
import {GenerateHashService} from "../../../shared/generateHash.service";
import {UpdateEditionComponent} from '../update-edition/update-edition.component';

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
  action: any;

  constructor(
    public dialog: MatDialog,
    public dialogUpdateEdition: MatDialog,
    private route: ActivatedRoute,
    private editionService: EditionService,
    private generateHashService: GenerateHashService,
    private actionService: ActionService
  ) { }

  ngOnInit() {
    console.log('Check if edition for this action exists');
    this.actionID = this.route.snapshot.queryParams.actionID;
    this.checkIfEditionExists( this.actionID );
  }
  checkIfEditionExists( actionID: number ) {
    console.log('Get Action and check if it has an edition');
    this.actionService.getById( actionID )
      .subscribe(
        data => {
          this.action = data;
          console.log('This action: ');
          console.log(this.action);
          if ( this.action && this.action.hasEdition ) {
            console.log('Update Edition');
          } else {
            this.edition = {};
            console.log('No edition for this action yet');
            this.edition.hash = this.generateHashService.generateHash();
            this.edition.title = 'Edition Titel';
            this.edition.linkToImage = 'https://www.zentralplus.ch/' +
              'images/cache/750x420/crop_238_313_1055_771/images%7Ccms-image-007547962.jpg';
            this.edition.description = 'Dies als Beispiel für eine Edition bei NIE-OS\n' +
              '    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy\n' +
              '    eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.\n' +
              '    At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea\n' +
              '    takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,\n' +
              '    consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et\n' +
              '    dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo\n' +
              '    dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem\n' +
              '    ipsum dolor sit amet.';
            console.log(this.edition);
          }
        },
        error => {
          console.log(error);
        });
  }
  generateDescription() {
    if ( this.edition && this.edition.description ) {
      return this.edition.description;
    } else {
      return 'Description not found';
    }
  }
  generateTitle() {
    if ( this.edition && this.edition.title ) {
      return this.edition.title;
    } else {
      return 'Title not found';
    }
  }
  generateImage() {
    if ( this.edition && this.edition.linkToImage ) {
      return this.edition.linkToImage;
    } else {
      return 'Image not found';
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogCreateNewViewComponent, {
      width: '700px',
      data: { name: this.name, animal: this.animal }
    });
  }
  openUpdateEditionDialog() {
    const dialogRef = this.dialogUpdateEdition.open(UpdateEditionComponent, {
      width: '700px',
      data: {
        title: this.edition.title,
        description: this.edition.description,
        image: this.edition.linkToImage
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if ( result !== undefined ) {
        this.edition.title = result.title;
        this.edition.description = result.description;
        this.edition.linkToImage = result.image;
      }
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
