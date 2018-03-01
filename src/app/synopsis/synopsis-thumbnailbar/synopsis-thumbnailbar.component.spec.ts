import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SynopsisThumbnailbarComponent } from './synopsis-thumbnailbar.component';
import { DraggableStubDirective } from '../stubs/directive-stubs';
import { MatDialogModule, MatIconModule } from '@angular/material';
import { SynopsisObjectStorageService } from '../synopsis-object-storage.service';

describe('SynopsisThumbnailbarComponent', () => {
  let component: SynopsisThumbnailbarComponent;
  let fixture: ComponentFixture<SynopsisThumbnailbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatIconModule
      ],
      declarations: [
        DraggableStubDirective,
        SynopsisThumbnailbarComponent
      ],
      providers: [
        SynopsisObjectStorageService
      ]
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
