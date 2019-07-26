import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StaticPagesModule } from './static-pages.module';
import { MaterialModule } from '../material.module';
import { NIEOSModule } from '../app-engine/nie-OS.module';
import { DialogUserSettingsDialog} from './header/header.component';
import { MainComponent } from './main/main.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavigationComponent } from './navigation/navigation.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { TextViewModule } from '../app-engine/apps/text-view/text-view.module';
import { KnoraRequestService } from '../query-engine/knora/knora-request.service';
import { SparqlRequestService } from '../query-engine/sparql/sparql-request.service';
import { ResultToTextMapperService } from '../app-engine/apps/text-view/result-to-text-mapper.service';
import { KnoraAuthService } from '../query-engine/knora/knora-auth.service';
import { SynopsisModule } from '../app-engine/apps/synopsis/synopsis.module';
import { SynopsisObjectStorageService } from '../app-engine/apps/synopsis/synopsis-object-storage.service';
import { AuthenticationService } from '../query-engine/fake-backend/auth/authentication.service';
import { MatDialogModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InitPopupComponent } from './init-popup/init-popup.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import {HowToProgramWithNieOSModule} from '../notes-and-tutorials/how-to-program-with-nie-os/how-to-program-with-nie-os.module';
import {MockupTutorialModule} from '../notes-and-tutorials/mockup-tutorial/mockup-tutorial.module';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { PizzaPartyComponent } from './header/header.component';
import { ExtendSessionComponent } from './header/header.component';
import { BrowserModule } from '@angular/platform-browser';
import {MatChipsModule} from '@angular/material/chips';
import { DevelopmentViewsModule } from '../app-engine/apps/development-views/development-views.module';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    StaticPagesModule,
    TextViewModule,
    MaterialModule,
    MatDialogModule,
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
    MatIconModule,
    RouterModule.forRoot([
      { path: '**', component: PageNotFoundComponent }
      ])
  ],
  declarations: [
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
  exports: [MainComponent, RouterModule]
})
export class CoreModule {
}
