import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentOnIndicesComponent } from './comment-on-indices.component';

describe('CommentOnIndicesComponent', () => {
  let component: CommentOnIndicesComponent;
  let fixture: ComponentFixture<CommentOnIndicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentOnIndicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentOnIndicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
