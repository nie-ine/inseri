import {Component, OnInit, OnDestroy, Inject, AfterViewChecked, ChangeDetectorRef} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AuthenticationService} from '../../shared/nieOS/fake-backend/auth/authentication.service';
import {ActionService} from '../../shared/nieOS/fake-backend/action/action.service';
import {ViewService} from '../../nie-OS/apps/view/view.service';
import {AuthService} from '../../shared/nieOS/mongodb/auth/auth.service';
import {Subscription} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {NgForm} from '@angular/forms';
import {InitService} from '../init-popup/service/init.service';
import {InitPopupComponent} from '../init-popup/init-popup.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewChecked {

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
    private initService: InitService,
    private router: Router,
    private dialog: MatDialog,
    private dialog2: MatDialog,
    private activatedRoute: ActivatedRoute,
    private actionService: ActionService,
    private viewService: ViewService,
    private authenticationService: AuthenticationService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
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
    if (this.initService.isAppLaunchingFirstTime()) {
        setTimeout(() => {
            this.dialog2.open(InitPopupComponent, {
                data: {}
            });
        }, 1000);
    }
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(
        isAuthenticated => {
          this.userIsAuthenticated = isAuthenticated;
        }
      );
  }

    ngAfterViewChecked() {
        this.cdr.detectChanges();
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

  loginOrLogoutButton(): string {
    return this.userIsAuthenticated ? 'Logout' : 'Login';
  }

  loginOrLogout() {
    if (this.userIsAuthenticated) {
      this.authService.logout();
      this.router.navigate(["/"]);
    } else {
        this.router.navigate(['home'], { fragment: 'login' });
        console.log('login');
    }
  }

  openSettingsDialog() {
    console.log('openSettingsDialog');
    this.dialog.open(DialogUserSettingsDialog, {
      width: '700px',
      height: '500px',
      // dummy data
       data: {
            firstName: 'Dominique',
            lastName: 'Souvant',
            email: 'dom@yahoo.de',
            newsLetter: true
        }
    });
  }

}

@Component({
    selector: 'dialog-user-settings-dialog',
    templateUrl: './dialog-user-settings-dialog.html',
    styleUrls: ['./dialog-user-settings-dialog.scss']
})

export class DialogUserSettingsDialog implements OnInit {
    firstName: string;
    lastName: string;
    email: string;
    newsLetter: boolean;

    constructor(public dialogRef: MatDialogRef<DialogUserSettingsDialog>,
                @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit() {
      this.firstName = this.data.firstName;
      this.lastName = this.data.lastName;
      this.email = this.data.email;
      this.newsLetter = this.data.newsLetter;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    save(form: NgForm) {
      console.log('Changes would be saved');
    }

    changePwd() {
      console.log('Change of password will be initialized');
    }

}
