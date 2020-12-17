import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FrameSettingsComponent } from './frame-settings.component';

describe('FrameSettingsComponent', () => {
  let component: FrameSettingsComponent;
  let fixture: ComponentFixture<FrameSettingsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FrameSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrameSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
