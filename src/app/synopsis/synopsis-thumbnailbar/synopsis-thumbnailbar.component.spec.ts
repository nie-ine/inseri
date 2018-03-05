import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SynopsisThumbnailbarComponent} from './synopsis-thumbnailbar.component';
import {DraggableStubDirective} from '../stubs/directive-stubs';
import {SynopsisObjectStorageService} from '../synopsis-object-storage.service';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('SynopsisThumbnailbarComponent', () => {
  let component: SynopsisThumbnailbarComponent;
  let fixture: ComponentFixture<SynopsisThumbnailbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DraggableStubDirective,
        SynopsisThumbnailbarComponent
      ],
      providers: [
        SynopsisObjectStorageService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SynopsisThumbnailbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
