import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SynopsisObjectComponent } from './synopsis-object.component';

describe('SynopsisObjectComponent', () => {
  let component: SynopsisObjectComponent;
  let fixture: ComponentFixture<SynopsisObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SynopsisObjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SynopsisObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
