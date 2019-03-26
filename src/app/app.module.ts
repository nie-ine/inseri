import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CoreModule} from './user-action-engine/core.module';
import {AppComponent} from './app.component';
import {AlertService} from './query-engine/fake-backend/auth/altert.service';
import {AuthenticationService} from './query-engine/fake-backend/auth/authentication.service';
import {FakeBackendInterceptor} from './query-engine/fake-backend/fake-backend';
import {AuthGuard} from './query-engine/fake-backend/auth/auth.guard';
import {environment} from '../environments/environment';
import {HttpClientModule, HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import {AuthService} from './user-action-engine/mongodb/auth/auth.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,

    // provider used to create fake backend
    { provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
