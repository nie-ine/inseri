import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { KnoraV2ViewerInnerhtmlComponent } from './knora-v2-viewer-innerhtml.component';

describe('TextRichInnerhtmlComponent', () => {
  let component: KnoraV2ViewerInnerhtmlComponent;
  let fixture: ComponentFixture<KnoraV2ViewerInnerhtmlComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KnoraV2ViewerInnerhtmlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnoraV2ViewerInnerhtmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
