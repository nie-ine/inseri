import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinedTextViewComponent } from './joined-text-view.component';

describe('JoinedTextViewComponent', () => {
  let component: JoinedTextViewComponent;
  let fixture: ComponentFixture<JoinedTextViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinedTextViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinedTextViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
