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
import { MetadataViewModule } from '../development-views/metadata-view/metadata-view.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { TextViewModule } from '../text-view/text-view.module';
import { ImageViewModule } from '../development-views/image-view/image-view.module';
import { KnoraRequestService } from '../shared/knora/knora-request.service';
import { SparqlRequestService } from '../shared/sparql/sparql-request.service';
import { ResultToTextMapperService } from '../text-view/result-to-text-mapper.service';
import { KnoraAuthService } from '../shared/knora/knora-auth.service';
import { SynopsisModule } from '../synopsis/synopsis.module';
import { SynopsisObjectStorageService } from '../synopsis/synopsis-object-storage.service';
import { CreateResourceViewModule } from '../development-views/create-resource-view/create-resource-view.module';
import { EditResourceViewModule } from '../development-views/edit-resource-view/edit-resource-view.module';
import { ArithmeticModule } from 'nie-ine';
import { AuthenticationService } from '../shared/nieOS/fake-backend/auth/authentication.service';
import { PageService } from '../nie-OS/apps/page/page.service';
import { MatDialogModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { InitPopupComponent } from './init-popup/init-popup.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import {HowToProgramWithNieOSModule} from '../developer-notes/how-to-program-with-nie-os/how-to-program-with-nie-os.module';
import {MyMainComponentComponent} from '../developer-notes/mockup-tutorial/my-main-component/my-main-component.component';
import { TempDevModule } from '../development-views/temp-dev.module';
import {MockupTutorialModule} from '../developer-notes/mockup-tutorial/mockup-tutorial.module';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { PizzaPartyComponent } from './header/header.component';

@NgModule({
  imports: [
    CommonModule,
    StaticPagesModule,
    ImageViewModule,
    TextViewModule,
    MaterialModule,
    MatDialogModule,
    MetadataViewModule,
    ArithmeticModule,
    NIEOSModule,
    DashboardModule,
    SynopsisModule,
    CreateResourceViewModule,
    EditResourceViewModule,
    FormsModule,
    TempDevModule,
    MatTooltipModule,
    HowToProgramWithNieOSModule,
    MockupTutorialModule,
    MatSnackBarModule,
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
    PizzaPartyComponent],
  entryComponents: [
    DialogUserSettingsDialog,
    InitPopupComponent,
    PizzaPartyComponent
  ],
  providers: [
    KnoraRequestService,
    SparqlRequestService,
    ResultToTextMapperService,
    KnoraAuthService,
    SynopsisObjectStorageService,
    AuthenticationService,
    PageService,
    DialogUserSettingsDialog
  ],
  exports: [HeaderComponent, FooterComponent, MainComponent, RouterModule]
})
export class CoreModule {
}
