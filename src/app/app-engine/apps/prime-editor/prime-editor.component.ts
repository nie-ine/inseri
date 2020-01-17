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
  @ViewChild('editor') editor;
  hidden = false;
  safeHtml: SafeHtml;
  constructor(
    private requestService: GeneralRequestService,
    public route: ActivatedRoute,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnChanges() {
    this.editor.text = this.textFile;
  }

  updateAce() {
    this.editor.text = this.textFile;
    console.log( JSON.stringify(this.textFile) );
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
    this.requestService.updateFile(
      this.appInputQueryMapping[ this.hash ][ 'textFile' ][ 'serverUrl' ].split('/')[ 6 ], { textFile: this.textFile} )
      .subscribe(
        data => {
          console.log( data );
        }, error => console.log( error )
      );
    this.reloadVariables.emit();
  }

}
