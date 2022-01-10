import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GeneralRequestService} from '../../../query-engine/general/general-request.service';

@Component({
  selector: 'app-url-param-updater',
  templateUrl: './url-param-updater.component.html',
  styleUrls: ['./url-param-updater.component.scss']
})
export class UrlParamUpdaterComponent implements OnChanges {
  @Input() param: string;
  @Input() textFile: string;
  @Input() appInputQueryMapping: string;
  @Output() reloadVariables: EventEmitter<any> = new EventEmitter<any>();
  @Input() hash: string;
  alreadyEmitted = false;

  constructor(
    private router: Router,
    private requestService: GeneralRequestService,
    public route: ActivatedRoute
  ) { }

  ngOnChanges() {
    // console.log( this.textFile );
    if ( this.param && this.textFile ) {
      this.updateParam();
    }
  }

  updateParam() {
    // console.log( this.route.snapshot.queryParams, this.param, this.textFile );
    let reload = false;
    if ( !this.route.snapshot.queryParams[ this.param ] ||
      this.route.snapshot.queryParams[ this.param ] !== this.textFile ) {
      // console.log( 'reload' );
      reload = true;
    }
    this.router.navigate([], {
      queryParams: {
        [ this.param ]: this.textFile
      },
      queryParamsHandling: 'merge'
    });
    if ( reload ) {
      this.save();
    }
  }

  save() {
    console.log( this.textFile, this.appInputQueryMapping[ this.hash ] );
    this.requestService.updateFile(
      this.appInputQueryMapping[ this.hash ][ 'textFile' ][ 'serverUrl' ]
        .split('/')[ 6 ], {
        [this.hash]: {
          textFile: this.textFile,
          param: this.param
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
