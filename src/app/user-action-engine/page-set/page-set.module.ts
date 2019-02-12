import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  DialogCreateNewPageComponent,
  PageSetLandingPageComponent
} from './page-set-landing-page/page-set-landing-page.component';
import {RouterModule} from '@angular/router';
import {
  MatButtonModule, MatDialogModule, MatIconModule, MatRadioModule, MatFormFieldModule,
  MatInputModule, MatProgressSpinnerModule, MatCheckboxModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import {PageSetService} from '../mongodb/pageset/page-set.service';
import {GenerateHashService} from '../other/generateHash.service';
import {EditPageSetComponent} from './edit-page-set/edit-page-set.component';
import {MatDividerModule} from '@angular/material/divider';
import {EditPageComponent } from './edit-page/edit-page.component';
import { DeletePageComponent } from './delete-page/delete-page.component';
import { DuplicatePageComponent } from './duplicate-page/duplicate-page.component';

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
    RouterModule.forRoot([
      {path: 'page-set', component: PageSetLandingPageComponent}
    ])
  ],
  declarations: [
    PageSetLandingPageComponent,
    DialogCreateNewPageComponent,
    EditPageSetComponent,
    EditPageComponent,
    DeletePageComponent,
    DuplicatePageComponent
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
  ]
})
export class MyPageSetModule { }
