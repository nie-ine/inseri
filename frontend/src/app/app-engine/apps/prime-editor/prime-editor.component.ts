import {AfterViewChecked, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {GeneralRequestService} from '../../../query-engine/general/general-request.service';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Component({
  selector: 'app-prime-editor',
  templateUrl: './prime-editor.component.html',
  styleUrls: ['./prime-editor.component.scss']
})
export class PrimeEditorComponent implements OnChanges {
  @Input() textFile: string;
  @Input() appInputQueryMapping: string;
  @Input() hash: string;
  @Output() reloadVariables: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('editor', { static: true }) editor;
  hidden = false;
  safeHtml: SafeHtml;
  constructor(
    private requestService: GeneralRequestService,
    public route: ActivatedRoute,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnChanges() {
    console.log( this.textFile );
    this.editor.text = this.textFile;
    this.safeHtml = this.domSanitizer.bypassSecurityTrustHtml(this.textFile);
  }

  updateAce() {
    this.editor.text = this.textFile;
    // console.log( JSON.stringify(this.textFile) );
    this.safeHtml = this.domSanitizer.bypassSecurityTrustHtml(this.textFile);
  }

  updatePrimeEditor() {
    this.textFile = this.editor.text;
    this.hidden = true;
    this.safeHtml = this.domSanitizer.bypassSecurityTrustHtml(this.textFile);
  }

  tabClick(event: any) {
    console.log( event );
    if ( event.index === 0 ) {
      this.hidden = false;
    } else {
      this.hidden = true;
    }
  }

  save() {
    console.log( this.appInputQueryMapping, this.hash );
    const pathToTextList = this.appInputQueryMapping[ this.hash ][ 'textFile' ].path;
    const hashOfOriginalFileOwnerApp = pathToTextList.slice().reverse()[ 1 ];
    console.log( pathToTextList, pathToTextList.slice().reverse()[ 1 ] );
    console.log( hashOfOriginalFileOwnerApp );

    this.requestService.updateFile(
      this.appInputQueryMapping[ hashOfOriginalFileOwnerApp ][ pathToTextList.slice().reverse()[ 0 ] ][ 'serverUrl' ].split('/')[ 6 ],
      {
        [hashOfOriginalFileOwnerApp]: {
          [ pathToTextList.slice().reverse()[ 0 ] ]: this.textFile
        }
      }
        )
      .subscribe(
        data => {
          console.log( data );
          this.reloadVariables.emit();
        }, error => console.log( error )
      );

  }

}
