import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditionViewCanvasComponent} from './edition-view-canvas.component';
import {By} from '@angular/platform-browser';

describe('EditionViewCanvasComponent', () => {
  let component: EditionViewCanvasComponent;
  let fixture: ComponentFixture<EditionViewCanvasComponent>;
  let titleElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditionViewCanvasComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditionViewCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    titleElement = fixture.debugElement.query(By.css('h2')).nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the title element contain the title', () => {
    component.title = 'A test title';
    fixture.detectChanges();
    expect(titleElement.textContent).toContain(component.title);
  });
});
