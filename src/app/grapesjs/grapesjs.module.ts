import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrapesjsComponent } from './grapesjs/grapesjs.component';
import { RouterModule } from '@angular/router';
import { ExampleComponent } from 'nie-ine';
import { ArithmeticModule } from 'nie-ine';
import { Service } from './createComponentInstances.service';

@NgModule({
  imports: [
    CommonModule,
    ArithmeticModule,
    RouterModule.forChild([
      { path: 'grapesjs', component: GrapesjsComponent }
    ])
  ],
  providers: [Service],
  declarations: [
    GrapesjsComponent
  ],
  exports: [
    GrapesjsComponent
  ],
  entryComponents: [
    ExampleComponent
  ]
})
export class GrapesjsModule { }
