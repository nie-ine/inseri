import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatingTextObjectComponent } from './floating-text-object.component';
import { DraggableStubDirective, ModifiableStubDirective, SelectableStubDirective } from '../stubs/directive-stubs';
import { SynopsisTextData } from '../synopsis-object-data';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FloatingTextObjectComponent', () => {
  let component: FloatingTextObjectComponent;
  let fixture: ComponentFixture<FloatingTextObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FloatingTextObjectComponent,
        DraggableStubDirective,
        ModifiableStubDirective,
        SelectableStubDirective
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloatingTextObjectComponent);
    component = fixture.componentInstance;
    component.data = new SynopsisTextData('1', 'test', 'a test text');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
