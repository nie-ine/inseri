import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StaticPagesModule } from '../static-pages/static-pages.module';
import { MaterialModule } from '../material.module';
import { NIEOSModule } from '../nie-OS/nie-OS.module';
import { DialogUserSettingsDialog, HeaderComponent} from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavigationComponent } from './navigation/navigation.component';
import { DashboardModule } from '../dashboard/dashboard.module';
import { TextViewModule } from '../text-view/text-view.module';
import { KnoraRequestService } from '../shared/knora/knora-request.service';
import { SparqlRequestService } from '../shared/sparql/sparql-request.service';
import { ResultToTextMapperService } from '../text-view/result-to-text-mapper.service';
import { KnoraAuthService } from '../shared/knora/knora-auth.service';
import { SynopsisModule } from '../synopsis/synopsis.module';
import { SynopsisObjectStorageService } from '../synopsis/synopsis-object-storage.service';
import { ArithmeticModule } from 'nie-ine';
import { AuthenticationService } from '../shared/nieOS/fake-backend/auth/authentication.service';
import { MatDialogModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InitPopupComponent } from './init-popup/init-popup.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import {HowToProgramWithNieOSModule} from '../developer-notes/how-to-program-with-nie-os/how-to-program-with-nie-os.module';
import {MockupTutorialModule} from '../developer-notes/mockup-tutorial/mockup-tutorial.module';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { PizzaPartyComponent } from './header/header.component';
import { ExtendSessionComponent } from './header/header.component';
import { BrowserModule } from '@angular/platform-browser';
import {MatChipsModule} from '@angular/material/chips';
import { DevelopmentViewsModule } from '../development-views/development-views.module';


@NgModule({
  imports: [
    CommonModule,
    StaticPagesModule,
    TextViewModule,
    MaterialModule,
    MatDialogModule,
    ArithmeticModule,
    NIEOSModule,
    DashboardModule,
    SynopsisModule,
    FormsModule,
    DevelopmentViewsModule,
    ReactiveFormsModule,
    BrowserModule,
    MatTooltipModule,
    HowToProgramWithNieOSModule,
    MockupTutorialModule,
    MatSnackBarModule,
    MatChipsModule,
    RouterModule.forRoot([
      { path: '**', component: PageNotFoundComponent }
      ])
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    MainComponent,
    PageNotFoundComponent,
    NavigationComponent,
    DialogUserSettingsDialog,
    InitPopupComponent,
    PizzaPartyComponent,
    ExtendSessionComponent],
  entryComponents: [
    DialogUserSettingsDialog,
    InitPopupComponent,
    PizzaPartyComponent,
    ExtendSessionComponent
  ],
  providers: [
    KnoraRequestService,
    SparqlRequestService,
    ResultToTextMapperService,
    KnoraAuthService,
    SynopsisObjectStorageService,
    AuthenticationService,
    DialogUserSettingsDialog
  ],
  exports: [HeaderComponent, FooterComponent, MainComponent, RouterModule]
})
export class CoreModule {
}
