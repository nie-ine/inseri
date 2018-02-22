import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SynopsisImageObjectComponent } from './synopsis-image-object.component';

describe('SynopsisImageObjectComponent', () => {
  let component: SynopsisImageObjectComponent;
  let fixture: ComponentFixture<SynopsisImageObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SynopsisImageObjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SynopsisImageObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
