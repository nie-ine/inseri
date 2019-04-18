import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextRichInnerhtmlComponent } from './text-rich-innerhtml.component';

describe('TextRichInnerhtmlComponent', () => {
  let component: TextRichInnerhtmlComponent;
  let fixture: ComponentFixture<TextRichInnerhtmlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextRichInnerhtmlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextRichInnerhtmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
