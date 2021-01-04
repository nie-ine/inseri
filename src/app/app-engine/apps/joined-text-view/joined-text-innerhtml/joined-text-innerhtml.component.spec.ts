import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinedTextInnerhtmlComponent } from './joined-text-innerhtml.component';

describe('TextRichInnerhtmlComponent', () => {
  let component: JoinedTextInnerhtmlComponent;
  let fixture: ComponentFixture<JoinedTextInnerhtmlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinedTextInnerhtmlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinedTextInnerhtmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
