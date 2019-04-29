import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextDevViewComponent } from './text-dev-view.component';
import { TextStructureModule } from '../../../text-structure/text-structure.module';
import { RichTextModule } from '../../../shared/rich-text/rich-text.module';
import { ComplexTextViewsModule } from '../../../complex-text-views/complex-text-views.module';

describe('TextDevViewComponent', () => {
  let component: TextDevViewComponent;
  let fixture: ComponentFixture<TextDevViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextDevViewComponent ],
      imports: [ TextStructureModule, RichTextModule, ComplexTextViewsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextDevViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
