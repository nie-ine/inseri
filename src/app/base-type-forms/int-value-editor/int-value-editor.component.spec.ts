import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntValueEditorComponent } from './int-value-editor.component';

describe('IntValueEditorComponent', () => {
  let component: IntValueEditorComponent;
  let fixture: ComponentFixture<IntValueEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntValueEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntValueEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
