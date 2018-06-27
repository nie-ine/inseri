import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DialogCreateNewViewComponent,
  EditionLandingPageComponent
} from './edition-landing-page/edition-landing-page.component';
import {RouterModule} from '@angular/router';
import {MatButtonModule, MatDialogModule, MatIconModule, MatRadioModule} from "@angular/material";
import {FormsModule} from "@angular/forms";
import {MatMenuModule} from '@angular/material/menu';
import {EditionService} from "./model/edition.service";
import {GenerateHashService} from "../../shared/generateHash.service";

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    MatRadioModule,
    MatMenuModule,
    MatIconModule,
    RouterModule.forRoot([
      {path: 'my-edition', component: EditionLandingPageComponent}
    ])
  ],
  declarations: [
    EditionLandingPageComponent,
    DialogCreateNewViewComponent
  ],
  entryComponents: [
    DialogCreateNewViewComponent
  ],
  providers: [
    EditionService,
    GenerateHashService
  ]
})
export class MyEditionModule { }
