import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RichTextByIriComponent } from './rich-text-by-iri.component';

describe('RichTextByIriComponent', () => {
  let component: RichTextByIriComponent;
  let fixture: ComponentFixture<RichTextByIriComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RichTextByIriComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RichTextByIriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
