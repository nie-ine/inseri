import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-raeber-navigation',
  templateUrl: './raeber-navigation.component.html',
  styleUrls: ['./raeber-navigation.component.scss']
})
export class RaeberNavigationComponent implements OnInit {
  @Input() actionID: string;
  @Input() pageId: string;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.setNewUrl( 'http://raeber.nie-ine.ch' );
  }

  setNewUrl( url: string ) {
    this.router.navigate(['/page'],
      { queryParams:
          {
            actionID: this.actionID,
            page: this.pageId,
            url: url
          }
      });
  }

}
