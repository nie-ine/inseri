import {Component, OnInit} from '@angular/core';
import {AuthService} from './user-action-engine/mongodb/auth/auth.service';
import { environment } from '../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import { OverlayContainer} from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  theme = 'none';
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router,
    private overlayContainer: OverlayContainer
  ) { }

  ngOnInit() {
    // console.log( localStorage.getItem( 'theme' ) );
    // this.overlayContainer.getContainerElement()
    //   .classList.add( localStorage.getItem( 'theme' ) ); // overlay so dropdown of themes is not affected by styles
    this.authService.autoAuthUser();
  }
}
