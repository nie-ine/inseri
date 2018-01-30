import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditionViewMetadataComponent } from './edition-view-metadata.component';

describe('EditionViewMetadataComponent', () => {
  let component: EditionViewMetadataComponent;
  let fixture: ComponentFixture<EditionViewMetadataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditionViewMetadataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditionViewMetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
