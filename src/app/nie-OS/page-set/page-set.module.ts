import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  DialogCreateNewPageComponent,
  PageSetLandingPageComponent
} from './page-set-landing-page/page-set-landing-page.component';
import {RouterModule} from '@angular/router';
import {
  MatButtonModule, MatDialogModule, MatIconModule, MatRadioModule, MatFormFieldModule,
  MatInputModule
} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import {PageSetService} from './model/page-set.service';
import {GenerateHashService} from '../../shared/nieOS/other/generateHash.service';
import {ActionService} from '../../shared/nieOS/fake-backend/action/action.service';
import {UpdatePageSetComponent} from './update-page-set/update-page-set.component';
import {CreatePageSetAndLinkToActionService} from './services/createPageSetAndLinkToAction.service';
import {CreatePageAndLinkToAction} from './services/createPageAndLinkToAction.service';
import {MatDividerModule} from '@angular/material/divider';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    MatRadioModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    RouterModule.forRoot([
      {path: 'page-set', component: PageSetLandingPageComponent}
    ])
  ],
  declarations: [
    PageSetLandingPageComponent,
    DialogCreateNewPageComponent,
    UpdatePageSetComponent
  ],
  entryComponents: [
    DialogCreateNewPageComponent,
    UpdatePageSetComponent
  ],
  providers: [
    PageSetService,
    GenerateHashService,
    ActionService,
    CreatePageSetAndLinkToActionService,
    CreatePageAndLinkToAction
  ]
})
export class MyPageSetModule { }
