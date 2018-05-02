import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationService } from '../../shared/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentRoute: string;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    //setTimeout(() => {
      router.events.subscribe(( route: any ) => this.updateCurrentRoute( route ) );
   // }, 1000);
  }

  ngOnInit() {

  }

  updateCurrentRoute( route: any ) {
    this.currentRoute = route.url;
  }

  generateLeftHeaderString(): string {
    return (
      this.routeMapping( 'dashboard', 'NIE-INE Platform - Dashboard' ) ||
      this.routeMapping( 'home', 'NIE-INE Platform' ) ||
      this.routeMapping( '', 'NIE-INE Platform' ) ||
      this.routeMapping( 'arbeitsflaeche', 'NIE-INE Platform - Arbeitsfläche' )
    );
  }

  generateLoginOrSettingsButton(): string {
    return(
      this.routeMapping( 'dashboard', 'Logout' ) ||
      this.routeMapping( 'home', 'Login' ) ||
      this.routeMapping( '', 'Login' )
    );
  }

  generateFunktionenHomeLink(): string {
    return(
      this.routeMapping( 'dashboard', '' ) ||
      this.routeMapping( 'home', 'Funktionen' )
    );
  }

  generateLeftHeaderStringLink() {
    return(
      this.routeMapping( 'dashboard', 'dashboard#top' ) ||
      this.routeMapping( 'home', 'home#top' ) ||
      this.routeMapping( '', 'home#top' ) ||
      this.routeMapping( 'arbeitsflaeche', 'dashboard#top' )
    );
  }

  routeMapping( location: string, output: string ): string {
    if ( this.currentRoute && this.currentRoute.search(location) !== -1 ) {
      return output;
    }
  }

  generateLoginOrSettingsLink() {
    return(
      this.routeMapping( 'home', 'home#login' ) ||
      this.routeMapping( '', 'home#top' ) ||
      this.routeMapping( 'dashboard', 'home#top' )
    );
  }

  logout(){
    if ( this.routeMapping('dashboard', 'true') ) {
      this.authenticationService.logout();
      console.log('logout');
    }
  }

}
