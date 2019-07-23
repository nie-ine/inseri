import {Component, OnInit, OnDestroy, Inject, AfterViewChecked, ChangeDetectorRef} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AuthenticationService} from '../../query-engine/fake-backend/auth/authentication.service';
import {AuthService} from '../mongodb/auth/auth.service';
import {Subscription} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {InitService} from '../init-popup/service/init.service';
import {InitPopupComponent} from '../init-popup/init-popup.component';
import {ActionService} from '../mongodb/action/action.service';
import {PageService} from '../mongodb/page/page.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ThemePalette} from '@angular/material/core';
import {Observable} from 'rxjs';
import 'rxjs/add/observable/interval';
import {ContactService} from '../mongodb/contact/contact.service';
import { environment } from '../../../environments/environment';
import { PasswordFormatCheckService } from '../shared/password-format-check.service';

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
  userInfo: string;
  sub: any;
  snackBarOpen = false;
  dialogIsOpen = false;

  constructor(
    private initService: InitService,
    private router: Router,
    private dialog: MatDialog,
    private dialog2: MatDialog,
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private authService: AuthService,
    public cdr: ChangeDetectorRef,
    public snackBar: MatSnackBar,
    private actionService: ActionService,
  ) {
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

  openExtendSessionBar() {
    this.snackBar.openFromComponent(ExtendSessionComponent, {
      duration: 100000,
    });
  }

  checkTimeUntilLogout() {
    const now = new Date();
    const expirationDate = localStorage.getItem('expiration');
    const secondsTotal = ( new Date(expirationDate).getTime() - now.getTime() ) / 1000;
    const minutes = Math.floor(secondsTotal / 60);
    const seconds = Math.floor(secondsTotal - minutes * 60);
    this.userInfo = 'Session expires in ' + minutes + ' min and ' + seconds + ' sec';
    if ( expirationDate && new Date(expirationDate).getTime() - now.getTime() > 0) {
      if ( minutes < 5 && !this.snackBarOpen) {
        this.snackBarOpen = true;
        this.openExtendSessionBar();
      } else if ( minutes > 5 ) {
        this.snackBar.dismiss();
      }
    }
  }

  ngOnInit() {
    this.sub = Observable.interval(1000)
      .subscribe((val) => {
        this.checkTimeUntilLogout();
      });
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
              for (const page of ( data.body as any ).action.hasPageSet.hasPages as any ) {
                console.log( page._id, this.hashOfThisPage );
                if ( page._id === this.hashOfThisPage ) {
                  this.selectedPage = this.pagesOfThisActtion.length;
                  console.log( this.selectedPage );
                }
                this.pagesOfThisActtion[this.pagesOfThisActtion.length] = page;
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

  generateLeftHeaderString(): string {
    return (
      this.routeMapping( 'dashboard', 'Inseri - Dashboard' ) ||
      this.routeMapping( 'home', 'Inseri' ) ||
      this.routeMapping( 'page', 'Inseri - Page' ) ||
      this.routeMapping( '', 'Inseri' )
    );
  }

  generateLoginOrSettingsButton(): string {
    return(
      this.routeMapping( 'dashboard', 'Logout' ) ||
      this.routeMapping( 'page', 'User Settings' )
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
      return (this.router.url && this.router.url.search( 'dash') === 1);
  }

  routeMapping( location: string, output: string ): string {
    if ( this.router.url && this.router.url.search( location ) !== -1 ) {
      return output;
    }
  }

  loginOrLogoutButton(): string {
    return this.userIsAuthenticated ? 'Logout ' : 'Login';
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
    if ( !this.dialogIsOpen ) {
      this. dialogIsOpen = true;
      const userId = localStorage.getItem('userId');
      if (userId) {
        this.authService.getUser(userId).subscribe((result) => {
          const dialogRef = this.dialog.open(DialogUserSettingsDialog, {
            width: '600px',
            data: {
              userId: userId,
              email: result.user.email,
              firstName: result.user.firstName,
              lastName: result.user.lastName,
              newsletter: result.user.newsletter
            }
          });
          dialogRef.afterClosed().subscribe((result1) => {
            this. dialogIsOpen = false;
          });
        }, (error) => {
          console.log(error);
        });
      } else {
        console.log('UserId was not found in storage');
      }
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
    deleteAccount: FormGroup;
    neededSpecialCharacters;
    wrongFormatAlert = false;

    constructor(
      public dialogRef: MatDialogRef<DialogUserSettingsDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private authService: AuthService,
      public snackBar: MatSnackBar,
      private router: Router,
      private contactService: ContactService,
      private passwortFormatCheckService: PasswordFormatCheckService
    ) {}

    ngOnInit() {
      this.neededSpecialCharacters = this.passwortFormatCheckService.neededSpecialCharacters;
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

      this.deleteAccount = new FormGroup( {
        email: new FormControl(this.data.email, [Validators.required, Validators.pattern(/^.+@.+\.\w+$/)]),
        oldpwd: new FormControl('', [Validators.required]),
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
            if (this.profileForm.get('newsletter').value) {
              const message = 'Guten Tag, ' + this.profileForm.get('firstname').value + ', Du hast Dich zu unserem Newsletter angemeldet.' +
                '\n\nBitte klicke auf den folgenden Link, wenn Du Dich abmelden möchtest: \n\n'
                + environment.app + '/deactivate-newsletter?user=' + this.userId;
              this.contactService.sendMessage(message, this.profileForm.get('email').value)
                .subscribe(response1 => {
                  console.log(response1);
                }, error1 => {
                  console.log(error1);
                });
            }
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
  if (this.passwortFormatCheckService.checkProposedPassword(this.pwdForm.get('newpwd1').value)) {
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
    } else {
      this.wrongFormatAlert = true;
    }
  }

  delete() {
      console.log('Delete Account');
      this.authService.deleteAccount( this.userId, this.deleteAccount.get('oldpwd').value )
      .subscribe(result => {
        console.log( result );
        this.contactService.sendMessage(
          'Guten Tag, ' + this.data.firstName + ',\n\n' +
          'schade, dass Du Deinen Account bei Inseri deaktiviert hast, wir werden Dich vermissen!\n\n\n' +
          'Innerhalb der nächsten 30 Tage kannst Du Deinen Account wiederherstellen, wenn Du hier klickst:\n\n' +
          environment.app + '/reactivate?user=' + this.userId +
          '\n\n\nViele schöne Grüsse und alles Gute von Deinem Inseri Team!', this.profileForm.get('email').value
        )
          .subscribe( response => {
            console.log(response);
          }, error1 => {
            console.log(error1);
          });
        this.authService.logout();
        this.router.navigate(['/home'], { queryParams: {deletedAccount: true} });
        this.dialogRef.close();
      }, error1 => {
        console.log( error1 );
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

@Component({
  selector: 'session-component',
  templateUrl: 'extend-session.html'
})
export class ExtendSessionComponent {
  password = 'password';
  email = 'Email';
  loginError = false;
  constructor(
    public authService: AuthService,
    public cdr: ChangeDetectorRef
  ) {
  }
  extendSession() {
    this.loginError = false;
    console.log( 'Extend Session - get request with user ID', this.email, this.password );
    this.authService.logout( true );
    this.authService.login(
      this.email,
      this.password,
      false
    );
    setTimeout(() => {
      console.log( 'Indicate that sth is wrong' );
      this.loginError = true;
      this.cdr.detectChanges();
    }, 4000);
  }

}

