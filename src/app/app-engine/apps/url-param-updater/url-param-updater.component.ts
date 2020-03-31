import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-url-param-updater',
  templateUrl: './url-param-updater.component.html',
  styleUrls: ['./url-param-updater.component.scss']
})
export class UrlParamUpdaterComponent implements OnChanges {
  @Input() param: string;
  paramValue: string;
  @Output() reloadVariables: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private router: Router
  ) { }

  ngOnChanges() {
  }

  updateParam() {
    this.router.navigate([], {
      queryParams: {
        [ this.param ]: this.paramValue
      },
      queryParamsHandling: 'merge'
    });
    this.reloadVariables.emit();
  }

}
