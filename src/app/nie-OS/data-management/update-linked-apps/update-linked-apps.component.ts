import {AfterViewChecked, ChangeDetectorRef, Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-update-linked-apps',
  templateUrl: './update-linked-apps.component.html'
})
export class UpdateLinkedAppsComponent implements AfterViewChecked, OnChanges, OnInit {
  @Input() appIndexMap = {};
  localIndexMap = {};
  constructor(
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    console.log( this.appIndexMap );
  }

  ngOnChanges() {
    console.log( this.appIndexMap );
  }

  ngAfterViewChecked() {
    if ( this.localIndexMap !== this.appIndexMap ) {
      this.localIndexMap = this.appIndexMap;
      console.log(this.localIndexMap);
    }
  }

}
