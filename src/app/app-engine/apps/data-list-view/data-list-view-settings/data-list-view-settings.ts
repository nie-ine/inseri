import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataListViewInAppQueryService} from '../services/query.service';
import {DisplayedCollumnsService} from '../data-list-view-services/table-data.service';

@Component({
  selector: 'data-list-view-settings',
  templateUrl: './data-list-view-settings.html'
})
export class DataListViewSettingsComponent implements OnInit
{

  @Input() displayedColumnsIn: any;
  displayedColumns: any;
  selectedOption;

  constructor( private displayedCollumnsService: DisplayedCollumnsService,
              // private settingsService: DataListViewSettings
  ) {}

  ngOnInit() {
    this.displayedColumns = this.displayedColumnsIn;
  }

  onNgModelChange($event) {
    console.log($event);
    this.selectedOption = $event;
  }

}
