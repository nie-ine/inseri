import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TextRichInnerhtmlComponent } from './text-rich-innerhtml.component';

describe('TextRichInnerhtmlComponent', () => {
  let component: TextRichInnerhtmlComponent;
  let fixture: ComponentFixture<TextRichInnerhtmlComponent>;

  beforeEach(waitForAsync(() => {
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
