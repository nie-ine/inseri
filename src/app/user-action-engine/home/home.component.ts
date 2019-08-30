import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
    public authService: AuthService,
    public http: HttpClient
  ) {
  }

  ngOnInit() {
    // reset login status
    const expirationDate = localStorage.getItem('expiration');
    const now = new Date();
    if (new Date(expirationDate).getTime() - now.getTime() > 0) {
      this.router.navigate(['/dashboard'], {fragment: 'top'});
    }

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || encodeURI('/dashboard#top');
    console.log(this.route.snapshot);
    if (this.route.snapshot.queryParams['deletedAccount']) {
      console.log('deletedAccount');
      this.deletedAccount = true;
    }
  }

  goToRegister(){
    this.router.navigate(['/register' ]);
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
