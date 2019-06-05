import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../query-engine/fake-backend/auth/authentication.service';
import { AlertService } from '../../query-engine/fake-backend/auth/altert.service';
import {AuthService} from '../mongodb/auth/auth.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

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
  forgotPassword = false;
  noEmailSent = false;
  longerThanExpected = false;
  emailSent = false;
  checked = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    public authService: AuthService,
    public http: HttpClient
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

    const headers = new HttpHeaders({
      // 'Origin': 'http://localhost:4200',
      'Content-Type': 'application/json'
    });
    let params = new HttpParams;
    params = params.append( 'query', '*' );
    params = params.append( 'wskey', 'zTMYGWi6G' );
    this.http.get(
      'https://www.europeana.eu/api/v2/search.json',
      {
        headers: headers,
        params: params
      } )
      .subscribe(
        data => {
          console.log( data );
        }, error => {
          console.log( error );
        }
      );

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
    }, 3000);
  }

  restorePassword() {
    console.log( 'Restore Password' );
    setTimeout(() => {
      this.longerThanExpected = true;
    }, 5000);
    this.authService.resetPassword(this.username)
      .subscribe(
        data => {
          console.log( data );
          this.longerThanExpected = false;
          this.emailSent = true;
        }, error1 => {
          console.log( error1 );
          this.longerThanExpected = false;
          this.noEmailSent = true;
        }
      );
  }

  forgotPasswordMethod() {
    console.log( this.forgotPassword );
    this.forgotPassword = !this.forgotPassword;
    return this.forgotPassword;
  }

}
