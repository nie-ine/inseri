import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextDevViewComponent } from './text-dev-view.component';

describe('TextDevViewComponent', () => {
  let component: TextDevViewComponent;
  let fixture: ComponentFixture<TextDevViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextDevViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextDevViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
