import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkValueLabelViewerComponent } from './link-value-label-viewer.component';

describe('LinkValueLabelViewerComponent', () => {
  let component: LinkValueLabelViewerComponent;
  let fixture: ComponentFixture<LinkValueLabelViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkValueLabelViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkValueLabelViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
