import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SynopsisTextObjectComponent } from './synopsis-text-object.component';

describe('SynopsisTextObjectComponent', () => {
  let component: SynopsisTextObjectComponent;
  let fixture: ComponentFixture<SynopsisTextObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SynopsisTextObjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SynopsisTextObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
