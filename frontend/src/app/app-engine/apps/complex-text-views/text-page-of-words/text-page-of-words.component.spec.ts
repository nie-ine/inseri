import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TextPageOfWordsComponent } from './text-page-of-words.component';

describe('TextPageOfWordsComponent', () => {
  let component: TextPageOfWordsComponent;
  let fixture: ComponentFixture<TextPageOfWordsComponent>;

  beforeEach(waitForAsync(() => {
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
