import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeEditorComponent } from './prime-editor.component';

describe('PrimeEditorComponent', () => {
  let component: PrimeEditorComponent;
  let fixture: ComponentFixture<PrimeEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimeEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
