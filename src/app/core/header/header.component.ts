import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../shared/authentication.service';
import {ActionService} from '../../shared/action.service';
import {ViewService} from '../../nie-OS/apps/view/view.service';
import {AuthService} from '../../shared/mongodb/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  currentRoute: string;
  viewsOfThisActtion: Array<any>;
  hashOfThisView: string;
  actionID: string;
  lastView: any;
  nextView: any;
  foundHashOfThisView: boolean;
  private authListenerSubs: Subscription;
  userIsAuthenticated = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private actionService: ActionService,
    private viewService: ViewService,
    private authenticationService: AuthenticationService,
    private authService: AuthService
  ) {
      router.events.subscribe(( route: any ) => {
        this.updateCurrentRoute( route );
      } );
    this.activatedRoute.queryParams.subscribe(params => {
      console.log(params);
      this.hashOfThisView = params.view;
      this.actionID = params.actionID;
      this.generateNavigation(params.actionID);
    });
  }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(
        isAuthenticated => {
          this.userIsAuthenticated = isAuthenticated;
        }
      );
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

  produceCurrentViewDescription() {
    if ( this.viewsOfThisActtion ) {
      for ( const view of this.viewsOfThisActtion ) {
        if ( view ) {
          if ( view.hash === this.hashOfThisView ) {
            return view.description;
          }
        }
      }
    }
  }
  produceCurrentViewTitle() {
    if ( this.viewsOfThisActtion ) {
      for (const view of this.viewsOfThisActtion) {
        if ( view ) {
          if (view.hash === this.hashOfThisView) {
            return view.title;
          }
        }
      }
    }
  }
  generateNavigation( actionID: number ) {
    console.log('Get action by id, then iterate through views');
    console.log( actionID );
    this.actionService.getById( actionID )
      .subscribe(
        data => {
          console.log(data);
          for ( const viewHash of ( data as any ).hasViews as any ) {
            console.log( viewHash );
            this.viewsOfThisActtion = [];
            this.viewService.getById( viewHash )
              .subscribe(
                view => {
                  this.viewsOfThisActtion[
                    this.viewsOfThisActtion.length
                    ] = view;
                  if ( this.hashOfThisView ) {
                    this.produceHashOfLastView();
                    this.produceHashOfNextView();
                  }
                  console.log( view );
                },
                errorGetView => {
                  console.log(errorGetView);
                }
              );
          }
        },
        error => {
          console.log(error);
        });
  }

  produceHashOfNextView() {
    this.nextView = undefined;
    for ( const view of this.viewsOfThisActtion ) {
      if ( view ) {
        if ( this.foundHashOfThisView ) {
          this.nextView = view;
          this.foundHashOfThisView = false;
        }
        if ( view.hash === this.hashOfThisView ) {
          this.foundHashOfThisView = true;
        }
      }
    }
  }

  navigateToOtherView( view: any) {
    console.log('Navigate to last View');
    this.router.navigate( [ 'arbeitsflaeche' ], {
      queryParams: {
        'actionID': this.actionID,
        'view': view.hash
      }
    } );
    return 'test';
  }

  produceHashOfLastView() {
    this.lastView = undefined;
    for ( const view of this.viewsOfThisActtion ) {
      if ( view ) {
        if ( view.hash === this.hashOfThisView ) {
          return null;
        } else {
          this.lastView = view;
        }
      }
    }
  }

  produceRightArrowTooltip() {
    if ( this.nextView ) {
      return 'go to ' + this.nextView.title;
    }
  }

  produceLeftArrowTooltip() {
    if ( this.lastView ) {
      return 'go to ' + this.lastView.title;
    }
  }

  updateCurrentRoute( route: any ) {
    this.currentRoute = route.url;
  }

  generateLeftHeaderString(): string {
    return (
      this.routeMapping( 'dashboard', 'nieOS - Dashboard' ) ||
      this.routeMapping( 'home', 'nieOS' ) ||
      this.routeMapping( 'arbeitsflaeche', 'nieOS - Page' ) ||
      this.routeMapping( '', 'nieOS' )

    );
  }

  generateLoginOrSettingsButton(): string {
    return(
      this.routeMapping( 'dashboard', 'Logout' ) ||
      this.routeMapping( 'arbeitsflaeche', 'Einstellungen' )
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
      this.routeMapping( 'arbeitsflaeche', 'dashboard#top' ) ||
      this.routeMapping( 'my-edition', 'dashboard#top' ) ||
      this.routeMapping( '', 'home#top' )
    );
  }

  routeMapping( location: string, output: string ): string {
    if ( this.currentRoute && this.currentRoute.search( location ) !== -1 ) {
      return output;
    }
  }

  generateLoginOrSettingsLink() {
    return(
      this.routeMapping( 'dashboard', 'home#top' ) ||
      this.routeMapping( 'arbeitsflaeche', '/settings' ) ||
      this.routeMapping( '', 'home#top' )
    );
  }

  logout(){
    if ( this.routeMapping('dashboard', 'true') ) {
      this.authenticationService.logout();
      console.log('logout');
    }
  }

  openSettingsDialog() {
    console.log('openSettingsDialog');
  }

}
