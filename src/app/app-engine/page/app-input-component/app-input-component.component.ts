import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {QueryService} from '../../../user-action-engine/mongodb/query/query.service';
import {environment} from '../../../../environments/environment';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {GeneralRequestService} from '../../../query-engine/general/general-request.service';
import {PageService} from '../../../user-action-engine/mongodb/page/page.service';
import {FileListDialogComponent} from '../file-list-dialog/file-list-dialog.component';

@Component({
  selector: 'app-app-input-component',
  templateUrl: './app-input-component.component.html'
})
export class AppInputComponentComponent {
  newFile = false;
  fileTitle: string;
  fileFormat: string;
  constructor(
    public dialogRef: MatDialogRef<AppInputComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private queryService: QueryService,
    private requestService: GeneralRequestService,
    private pageService: PageService,
    public dialog: MatDialog
  ) {
    console.log( data );
  }

  onNoClick( output?: any ): void {
    this.dialogRef.close( output );
  }

  createNewQueryAsFile( title: string, description: string, inputName: string ) {
    // console.log( 'Create new query as file', title, description );
    this.queryService.createQueryOfPage(this.data.page._id, {title: title})
      .subscribe(data => {
        if (data.status === 201) {
          const query = data.body.query;
          query.description = description;
          query.method = 'JSON';
          this.requestService.createJson()
            .subscribe(data3 => {
              query.serverUrl = environment.node + '/api/myOwnJson/getJson/' + String((data3 as any).result._id);
              this.updatePage( query, inputName, query.serverUrl );
              this.queryService.updateQuery(query._id, query)
                .subscribe((data1) => {
                  if (data1.status === 200) {
                    console.log( data1 );
                    this.onNoClick();
                  } else {
                    console.log('Updating query failed');
                  }
                }, error1 => console.log(error1));
              }, error3 => console.log(error3)
            );
        }
      });
  }

  updatePage( query: any, inputName: string, serverUrl: string ) {
    this.data.page.appInputQueryMapping[ this.data.appHash ] = {};
    this.data.page.appInputQueryMapping[ this.data.appHash ][ inputName ] = {};
    this.data.page.appInputQueryMapping[ this.data.appHash ][ inputName ][ 'path' ] = [ 'result', 'content', 'info' ];
    this.data.page.appInputQueryMapping[ this.data.appHash ][ inputName ][ 'serverUrl' ] = serverUrl;
    this.data.page.appInputQueryMapping[ this.data.appHash ][ inputName ][ 'query' ] = query._id;
    this.data.page.queries.push( query._id );
    this.pageService.updatePage(this.data.page)
      .subscribe(
        data4 => {
          console.log(data4);
        },
        error => {
          console.log(error);
        });
  }

  openExistingFileDialog( inputName: string ) {
    const dialogRef = this.dialog.open(FileListDialogComponent, {
      width: '80%',
      height: '80%',
      data: { }
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log( result, inputName, 'update query, do not create a new query' );
      this.queryService.addExistingQueryToPage(this.data.page._id, result)
        .subscribe(
          data => {
            console.log(data);
            this.updatePage( result, inputName, result.serverUrl );
          },
          error => {
            console.log(error);
          });
    });
  }
}
