import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DateValueEditorComponent } from './date-value-editor/date-value-editor.component';
import { LinkValueEditorComponent } from './link-value-editor/link-value-editor.component';
import { TextValueEditorComponent } from './text-value-editor/text-value-editor.component';
import { IntValueEditorComponent } from './int-value-editor/int-value-editor.component';
import { DecimalValueEditorComponent } from './decimal-value-editor/decimal-value-editor.component';
import { BooleanValueEditorComponent } from './boolean-value-editor/boolean-value-editor.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [ 
    BooleanValueEditorComponent,
    DateValueEditorComponent, 
    DecimalValueEditorComponent,  
    IntValueEditorComponent, 
    LinkValueEditorComponent, 
    TextValueEditorComponent 
  ],
  exports: [ 
    BooleanValueEditorComponent,
    DateValueEditorComponent, 
    DecimalValueEditorComponent,  
    IntValueEditorComponent, 
    LinkValueEditorComponent, 
    TextValueEditorComponent 
  ]
})
export class BaseTypeFormsModule { }
