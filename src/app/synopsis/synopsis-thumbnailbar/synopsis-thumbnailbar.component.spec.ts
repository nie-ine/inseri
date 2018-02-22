import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SynopsisThumbnailbarComponent } from './synopsis-thumbnailbar.component';

describe('SynopsisThumbnailbarComponent', () => {
  let component: SynopsisThumbnailbarComponent;
  let fixture: ComponentFixture<SynopsisThumbnailbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SynopsisThumbnailbarComponent ]
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
