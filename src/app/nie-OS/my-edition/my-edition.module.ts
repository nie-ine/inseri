import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DialogCreateNewViewComponent,
  EditionLandingPageComponent
} from './edition-landing-page/edition-landing-page.component';
import {RouterModule} from '@angular/router';
import {
  MatButtonModule, MatDialogModule, MatIconModule, MatRadioModule, MatFormFieldModule,
  MatInputModule
} from "@angular/material";
import {FormsModule} from "@angular/forms";
import {MatMenuModule} from '@angular/material/menu';
import {EditionService} from "./model/edition.service";
import {GenerateHashService} from "../../shared/generateHash.service";
import {ActionService} from "../../shared/action.service";
import { UpdateEditionComponent } from './update-edition/update-edition.component';
import {CreateOrUpdateEditionService} from "./services/createOrUpdateEdition.service";

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
    RouterModule.forRoot([
      {path: 'my-edition', component: EditionLandingPageComponent}
    ])
  ],
  declarations: [
    EditionLandingPageComponent,
    DialogCreateNewViewComponent,
    UpdateEditionComponent
  ],
  entryComponents: [
    DialogCreateNewViewComponent,
    UpdateEditionComponent
  ],
  providers: [
    EditionService,
    GenerateHashService,
    ActionService,
    CreateOrUpdateEditionService
  ]
})
export class MyEditionModule { }
