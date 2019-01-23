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
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('userId');
    if ( expirationDate && user && token ) {
      this.router.navigate(['/dashboard' ], {fragment: 'top'});
    }

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || encodeURI('/dashboard#top');
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
/*    this.authenticationService.login(this.username, this.password)
      .subscribe(
        data => {
          console.log(data);
          this.router.navigate(['/dashboard' ], {fragment: 'top'});
        },
        error => {
          this.loginError = true;
          console.log(error);
          this.alertService.error(error);
          this.loading = false;
        });*/
  }

}
