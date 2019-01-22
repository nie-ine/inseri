import {Component, OnInit, OnDestroy, Inject, AfterViewChecked, ChangeDetectorRef} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AuthenticationService} from '../../shared/nieOS/fake-backend/auth/authentication.service';
import {AuthService} from '../../shared/nieOS/mongodb/auth/auth.service';
import {Subscription} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {InitService} from '../init-popup/service/init.service';
import {InitPopupComponent} from '../init-popup/init-popup.component';
import {ActionService} from '../../shared/nieOS/mongodb/action/action.service';
import {PageService} from '../../shared/nieOS/mongodb/page/page.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ThemePalette} from '@angular/material/core';

export interface ChipColor {
  name: string;
  color: ThemePalette;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewChecked {
  currentRoute: string;
  pagesOfThisActtion: Array<any>;
  hashOfThisPage: string;
  actionID: string;
  lastView: any;
  nextView: any;
  foundHashOfThisView: boolean;
  private authListenerSubs: Subscription;
  userIsAuthenticated = false;
  action: any;
  pagesOfThisAction: any;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  selectedPage = 0;
  alreadyLoaded = false;

  constructor(
    private initService: InitService,
    private router: Router,
    private dialog: MatDialog,
    private dialog2: MatDialog,
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    public snackBar: MatSnackBar,
    private actionService: ActionService,
  ) {
      router.events.subscribe(( route: any ) => {
        this.updateCurrentRoute( route );
      } );

      this.activatedRoute.queryParams.subscribe(params => {
        this.hashOfThisPage = params.page;
        this.actionID = params.actionID;
        this.generateNavigation(params.actionID);
      });
  }

  selectPage(i: number, page: any) {
    this.selectedPage = i;
    this.navigateToOtherView(page);
  }

  checkIfSelected( index: number ) {
    return (index === this.selectedPage);
  }

  openSnackBar() {
    this.snackBar.openFromComponent(PizzaPartyComponent, {
      duration: 3000,
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

  generateNavigation(actionID: string) {
    if (!this.alreadyLoaded && actionID) {
      this.actionService.getAction(actionID)
        .subscribe(data => {
            if (data.body.action.type === 'page-set') {
              this.pagesOfThisActtion = [];
              for (const pageHash of ( data.body as any ).action.hasPageSet.hasPages as any ) {
                this.pagesOfThisActtion[this.pagesOfThisActtion.length] = pageHash;
                this.alreadyLoaded = true;
              }
            }
          },
          error => {
            // console.log(error);
          });
    }
  }

  navigateToOtherView(page: any) {
    console.log('Navigate to last View');
    this.router.navigate( [ 'page' ], {
      queryParams: {
        'actionID': this.actionID,
        'page': page._id
      }
    } );
  }

  updateCurrentRoute( route: any ) {
    this.currentRoute = route.url;
  }

  generateLeftHeaderString(): string {
    return (
      this.routeMapping( 'dashboard', 'NIE-OS - Dashboard' ) ||
      this.routeMapping( 'home', 'NIE-OS' ) ||
      this.routeMapping( 'page', 'NIE-OS - Page' ) ||
      this.routeMapping( '', 'NIE-OS' )
    );
  }

  generateLoginOrSettingsButton(): string {
    return(
      this.routeMapping( 'dashboard', 'Logout' ) ||
      this.routeMapping( 'page', 'Einstellungen' )
    );
  }

  generateFunctionsHomeLink(): string {
    return(
      this.routeMapping( 'dashboard', '' ) // ||
      // this.routeMapping( 'home', 'Funktionen' )
    );
  }

  generateLeftHeaderStringLink() {
    return(
      this.routeMapping( 'dashboard', 'dashboard#top' ) ||
      this.routeMapping( 'home', 'home#top' ) ||
      this.routeMapping( 'page', 'dashboard#top' ) ||
      this.routeMapping( 'page-set', 'dashboard#top' ) ||
      this.routeMapping( '', 'home#top' )
    );
  }

  isAuthenticated(): boolean {
      return this.userIsAuthenticated;
  }

  isOnDashboard(): boolean {
      return (this.currentRoute && this.currentRoute.search( 'dash') === 1);
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
      this.router.navigate(['/']);
    } else {
        this.router.navigate(['/home'], { fragment: 'login' });
    }
  }

  openSettingsDialog() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.authService.getUser(userId).subscribe((result) => {
        this.dialog.open(DialogUserSettingsDialog, {
          width: '600px',
          data: {
            userId: userId,
            email: result.user.email,
            firstName: result.user.firstName,
            lastName: result.user.lastName,
            newsletter: result.user.newsletter
          }
        });
      }, (error) => {
        console.log(error);
      });
    } else {
      console.log('UserId was not found in storage');
    }
  }
}

@Component({
    selector: 'dialog-user-settings-dialog',
    templateUrl: './dialog-user-settings-dialog.html',
    styleUrls: ['./dialog-user-settings-dialog.scss']
})

export class DialogUserSettingsDialog implements OnInit {
    userId: string;
    errorPwd: boolean;
    errorPwdMessage: string;
    errorProfile: boolean;
    errorProfileMessage: string;
    profileForm: FormGroup;
    pwdForm: FormGroup;

    constructor(
      public dialogRef: MatDialogRef<DialogUserSettingsDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private authService: AuthService,
      public snackBar: MatSnackBar
    ) {}

    ngOnInit() {
      this.userId = this.data.userId;

      this.profileForm = new FormGroup({
        firstname: new FormControl(this.data.firstName, [Validators.required, Validators.maxLength(25)]),
        lastname: new FormControl(this.data.lastName, [Validators.required, Validators.maxLength(25)]),
        email: new FormControl(this.data.email, [Validators.required, Validators.pattern(/^.+@.+\.\w+$/)]),
        newsletter: new FormControl((this.data.newsletter == null) ? true : this.data.newsletter,[])
      });

      this.pwdForm = new FormGroup( {
        oldpwd: new FormControl('', [Validators.required]),
        newpwd1: new FormControl('', [Validators.required, Validators.minLength(4)]),
        newpwd2: new FormControl('', [Validators.required, Validators.minLength(4)]),
      });

      this.resetErrorPwd();
      this.resetErrorProfile();
    }

    resetErrorPwd() {
      this.errorPwd = false;
    }

    resetErrorProfile() {
      this.errorProfile = false;
    }

    close() {
        this.dialogRef.close();
    }

    save() {
      this.resetErrorProfile();
      this.authService.updateUser(
        this.userId,
        this.profileForm.get('email').value,
        this.profileForm.get('firstname').value,
        this.profileForm.get('lastname').value,
        this.profileForm.get('newsletter').value)
          .subscribe((result) => {
            this.close();
          }, error => {
            if (error.status === 409) {
              this.errorProfile = true;
              this.errorProfileMessage = 'Email ist schon vergeben!';
            } else {
              this.errorProfile = true;
              this.errorProfileMessage = 'Fehler mit dem Server!';
            }
          });
    }

    changePwd() {
      this.resetErrorPwd();
      this.authService.updatePwd(
        this.userId,
        this.pwdForm.get('oldpwd').value,
        this.pwdForm.get('newpwd1').value)
          .subscribe(result => {
            this.close();
          }, (error) => {
            if (error.status === 400) {
              this.errorPwd = true;
              this.errorPwdMessage = 'Ungültiges Passwort!';
            } else if (error.status === 420) {
              this.errorPwd = true;
              this.errorPwdMessage = 'Neues und altes Passwort sind identisch!';
            } else {
              this.errorPwd = true;
              this.errorPwdMessage = 'Fehler mit dem Server!';
            }
          });
    }

}

@Component({
  selector: 'snack-bar-component-example-snack',
  templateUrl: 'snack-bar-component-example-snack.html',
  styles: [`
    .example-pizza-party {
      color: hotpink;
    }
  `],
})
export class PizzaPartyComponent {}
