import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TextlistViewerComponent } from './textlist-viewer.component';

describe('TextlistViewerComponent', () => {
  let component: TextlistViewerComponent;
  let fixture: ComponentFixture<TextlistViewerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TextlistViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextlistViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
