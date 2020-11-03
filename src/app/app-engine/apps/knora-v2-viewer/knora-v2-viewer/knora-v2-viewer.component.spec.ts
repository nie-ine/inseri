import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnoraV2ViewerComponent } from './knora-v2-viewer.component';

describe('KnoraV2Viewer', () => {
  let component: KnoraV2ViewerComponent;
  let fixture: ComponentFixture<KnoraV2ViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnoraV2ViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnoraV2ViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
