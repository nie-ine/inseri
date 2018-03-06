import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ThumbnailbarComponent} from './thumbnailbar.component';
import {DraggableStubDirective} from '../stubs/directive-stubs';
import {SynopsisObjectStorageService} from '../synopsis-object-storage.service';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('ThumbnailbarComponent', () => {
  let component: ThumbnailbarComponent;
  let fixture: ComponentFixture<ThumbnailbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DraggableStubDirective,
        ThumbnailbarComponent
      ],
      providers: [
        SynopsisObjectStorageService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThumbnailbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
