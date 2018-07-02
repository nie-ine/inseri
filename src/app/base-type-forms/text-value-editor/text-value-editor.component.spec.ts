import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextValueEditorComponent } from './text-value-editor.component';

describe('TextValueEditorComponent', () => {
  let component: TextValueEditorComponent;
  let fixture: ComponentFixture<TextValueEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextValueEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextValueEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
