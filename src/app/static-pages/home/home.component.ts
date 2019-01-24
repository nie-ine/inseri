import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../shared/nieOS/fake-backend/auth/authentication.service';
import { AlertService } from '../../shared/nieOS/fake-backend/auth/altert.service';
import {AuthService} from '../../shared/nieOS/mongodb/auth/auth.service';

declare let OpenSeadragon: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private fragment: string;
  username: string;
  password: string;
  model: any = {};
  loading = false;
  returnUrl: string;
  loginError = false;
  deletedAccount = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    public authService: AuthService
  ) {
  }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
    const expirationDate = localStorage.getItem('expiration');
    const now = new Date();
    if ( new Date(expirationDate).getTime() - now.getTime() > 0 ) {
      this.router.navigate(['/dashboard' ], {fragment: 'top'});
    }

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || encodeURI('/dashboard#top');
    console.log( this.route.snapshot );
    if ( this.route.snapshot.queryParams['deletedAccount'] ) {
      console.log( 'deletedAccount' );
      this.deletedAccount = true;
    }
  }

  startLoginProcess() {
    this.loginError = false;
    this.authService.login(
      this.username,
      this.password,
      true
    );
    setTimeout(() => {
      this.loginError = true;
    }, 4000);
  }

}
