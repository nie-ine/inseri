import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  DialogCreateNewPageComponent,
  PageSetLandingPageComponent
} from './page-set-landing-page/page-set-landing-page.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import {PageSetService} from '../mongodb/pageset/page-set.service';
import {GenerateHashService} from '../other/generateHash.service';
import {EditPageSetComponent} from './edit-page-set/edit-page-set.component';
import {MatDividerModule} from '@angular/material/divider';
import {EditPageComponent } from './edit-page/edit-page.component';
import { DeletePageComponent } from './delete-page/delete-page.component';
import { DuplicatePageComponent } from './duplicate-page/duplicate-page.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {SharedPipeModule} from '../../../pipes/shared-pipe-module/shared-pipe.module';
import { SubPageListComponent } from './sub-page-list/sub-page-list.component';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTreeModule} from '@angular/material/tree';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatTooltipModule,
    SharedPipeModule,
    RouterModule.forRoot([
    { path: 'page-set', component: PageSetLandingPageComponent }
], { relativeLinkResolution: 'legacy' }),
    MatTreeModule
  ],
  declarations: [
    PageSetLandingPageComponent,
    DialogCreateNewPageComponent,
    EditPageSetComponent,
    EditPageComponent,
    DeletePageComponent,
    DuplicatePageComponent,
    SubPageListComponent
  ],
  entryComponents: [
    DialogCreateNewPageComponent,
    EditPageSetComponent,
    EditPageComponent,
    DeletePageComponent,
    DuplicatePageComponent
  ],
  providers: [
    PageSetService,
    GenerateHashService
  ],
  exports: [
    SharedPipeModule
  ]
})
export class MyPageSetModule { }
