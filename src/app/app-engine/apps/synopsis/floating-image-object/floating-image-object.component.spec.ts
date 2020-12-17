import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FloatingImageObjectComponent } from './floating-image-object.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SynopsisImageData } from '../synopsis-object-data';
import { DraggableStubDirective, ModifiableStubDirective, SelectableStubDirective } from '../stubs/directive-stubs';


describe('FloatingImageObjectComponent', () => {
  let component: FloatingImageObjectComponent;
  let fixture: ComponentFixture<FloatingImageObjectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        FloatingImageObjectComponent,
        DraggableStubDirective,
        ModifiableStubDirective,
        SelectableStubDirective
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloatingImageObjectComponent);
    component = fixture.componentInstance;
    component.data = new SynopsisImageData('1', 'test', '../../test.jpg');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
