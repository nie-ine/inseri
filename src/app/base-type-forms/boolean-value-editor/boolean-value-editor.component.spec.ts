import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooleanValueEditorComponent } from './boolean-value-editor.component';

describe('BooleanValueEditorComponent', () => {
  let component: BooleanValueEditorComponent;
  let fixture: ComponentFixture<BooleanValueEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooleanValueEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooleanValueEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
