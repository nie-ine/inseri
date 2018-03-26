import {AfterViewInit, Component, OnInit} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

declare let OpenSeadragon: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private fragment: string;

  constructor( router: Router ) {
    router.events.subscribe(s => {
      if (s instanceof NavigationEnd) {
        const tree = router.parseUrl(router.url);
        if (tree.fragment) {
          const element = document.querySelector("#" + tree.fragment);
          if (element) { element.scrollIntoView(true); }
        }
      }
    });
  }

  ngOnInit() {
  }

  startLoginProcess() {
    console.log('Start Login Process');
  }

}
