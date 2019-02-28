import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextlistViewerComponent } from './textlist-viewer.component';

describe('TextlistViewerComponent', () => {
  let component: TextlistViewerComponent;
  let fixture: ComponentFixture<TextlistViewerComponent>;

  beforeEach(async(() => {
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
