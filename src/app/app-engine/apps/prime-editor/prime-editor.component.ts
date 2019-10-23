import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {GeneralRequestService} from '../../../query-engine/general/general-request.service';

@Component({
  selector: 'app-prime-editor',
  templateUrl: './prime-editor.component.html',
  styleUrls: ['./prime-editor.component.scss']
})
export class PrimeEditorComponent implements OnChanges {
  @Input() textFile: string;
  @Input() serverUrl: string;
  @Output() reloadVariables: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private requestService: GeneralRequestService
  ) { }

  ngOnChanges() {
  }

  save() {
    this.requestService.updateFile( this.serverUrl[ 'textFile' ][ 'serverUrl' ].split('/')[ 6 ], { textFile: this.textFile} )
      .subscribe(
        data => {
          console.log( data );
        }, error => console.log( error )
      );
    this.reloadVariables.emit();
  }

}
