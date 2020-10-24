import {Component, Input, ViewChild} from '@angular/core';
import {MatMenu} from '@angular/material';

/**
 * @title Nested menu
 */
@Component({
  selector: 'nested-menu',
  template: `
    <mat-menu><a *ngFor="let page of pages" mat-menu-item>  {{ page.page.title }} </a>
      <ng-content></ng-content>
    </mat-menu>
    <div ng-transclude></div>`,
  exportAs: 'nestedMenu'
})
export class NestedMenu {
  @Input() pages: any;
  @ViewChild(MatMenu) menu;
}
