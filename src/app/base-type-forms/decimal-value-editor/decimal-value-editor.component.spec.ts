import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecimalValueEditorComponent } from './decimal-value-editor.component';

describe('DecimalValueEditorComponent', () => {
  let component: DecimalValueEditorComponent;
  let fixture: ComponentFixture<DecimalValueEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecimalValueEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecimalValueEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
