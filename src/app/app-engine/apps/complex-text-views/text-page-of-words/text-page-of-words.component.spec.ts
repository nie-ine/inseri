import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextPageOfWordsComponent } from './text-page-of-words.component';

describe('TextPageOfWordsComponent', () => {
  let component: TextPageOfWordsComponent;
  let fixture: ComponentFixture<TextPageOfWordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextPageOfWordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextPageOfWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
