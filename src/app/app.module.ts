import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CoreModule} from './user-action-engine/core.module';
import {AppComponent} from './app.component';
import {AlertService} from './query-engine/fake-backend/auth/altert.service';
import {AuthenticationService} from './query-engine/fake-backend/auth/authentication.service';
import {HttpClientModule} from '@angular/common/http';
import {fakeBackendProvider} from './query-engine/fake-backend/fake-backend';
import {AuthGuard} from './query-engine/fake-backend/auth/auth.guard';
import {environment} from '../environments/environment';

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
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
