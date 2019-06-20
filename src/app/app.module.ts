import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CoreModule } from './user-action-engine/core.module';
import { AppComponent } from './app.component';
import { AlertService } from './query-engine/fake-backend/auth/altert.service';
import { AuthenticationService } from './query-engine/fake-backend/auth/authentication.service';
import { FakeBackendInterceptor } from './query-engine/fake-backend/fake-backend';
import { AuthGuard } from './query-engine/fake-backend/auth/auth.guard';
import { environment } from '../environments/environment';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AuthService } from './user-action-engine/mongodb/auth/auth.service';
import { KuiCoreConfigToken, KuiCoreModule } from '@knora/core';
import { KuiViewerModule } from '@knora/viewer';
import { KuiActionModule } from '@knora/action';
import { AppInitService } from './app-init.service';
import { FlexLayoutModule } from '@angular/flex-layout';


export function initializeApp(appInitService: AppInitService) {
  return (): Promise<any> => {
    return appInitService.Init();
  };
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    FlexLayoutModule,
    HttpClientModule,
    KuiActionModule,
    KuiCoreModule,
    KuiViewerModule

  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    // provider used to create fake backend
    {
      provide: HTTP_INTERCEPTORS,
      useClass: FakeBackendInterceptor, multi: true
    },
    AppInitService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppInitService],
      multi: true
    },
    {
      provide: KuiCoreConfigToken,
      useFactory: () => AppInitService.coreConfig
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
