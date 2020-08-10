import {Component, Input, Output} from '@angular/core';

@Component({
  selector: 'data-list-view-settings',
  templateUrl: './data-list-view-settings.html'
})
export class DataListViewSettingsComponent {

  @Input() displayedColumns: any;
  selectedOption;


  onNgModelChange($event) {
    console.log($event);
    this.selectedOption = $event;
  }

}
