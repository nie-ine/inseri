import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextPageOfWordsComponent } from './text-page-of-words.component';
import { RichTextModule } from '../../shared/rich-text/rich-text.module';
import { TextStructureModule } from '../../text-structure/text-structure.module';

describe('TextPageOfWordsComponent', () => {
  let component: TextPageOfWordsComponent;
  let fixture: ComponentFixture<TextPageOfWordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextPageOfWordsComponent ],
      imports: [ RichTextModule, TextStructureModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextPageOfWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
