import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SynopsisTextObjectComponent } from './synopsis-text-object.component';
import { DraggableStubDirective, ModifiableStubDirective, SelectableStubDirective } from '../stubs/directive-stubs';
import { SynopsisTextData } from '../synopsis-object-data';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SynopsisTextObjectComponent', () => {
  let component: SynopsisTextObjectComponent;
  let fixture: ComponentFixture<SynopsisTextObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SynopsisTextObjectComponent,
        DraggableStubDirective,
        ModifiableStubDirective,
        SelectableStubDirective
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SynopsisTextObjectComponent);
    component = fixture.componentInstance;
    component.data = new SynopsisTextData('test', '../../test.jpg');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
