import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {SubPageOfPageModel} from '../../../user-action-engine/mongodb/page/subPageOfPage.model';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {
  @Input() items: SubPageOfPageModel[];
  @ViewChild('childMenu') public childMenu;

  constructor(public router: Router) {
  }

  ngOnInit() {
  }
}
