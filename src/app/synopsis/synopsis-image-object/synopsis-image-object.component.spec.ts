import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SynopsisImageObjectComponent } from './synopsis-image-object.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SynopsisImageData } from '../synopsis-object-data';
import { DraggableStubDirective, ModifiableStubDirective, SelectableStubDirective } from '../stubs/directive-stubs';


describe('SynopsisImageObjectComponent', () => {
  let component: SynopsisImageObjectComponent;
  let fixture: ComponentFixture<SynopsisImageObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SynopsisImageObjectComponent,
        DraggableStubDirective,
        ModifiableStubDirective,
        SelectableStubDirective
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SynopsisImageObjectComponent);
    component = fixture.componentInstance;
    component.data = new SynopsisImageData('1', 'test', '../../test.jpg');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
