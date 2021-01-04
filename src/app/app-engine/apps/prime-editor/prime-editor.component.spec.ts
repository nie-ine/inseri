import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PrimeEditorComponent } from './prime-editor.component';

describe('PrimeEditorComponent', () => {
  let component: PrimeEditorComponent;
  let fixture: ComponentFixture<PrimeEditorComponent>;

  beforeEach(waitForAsync(() => {
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
