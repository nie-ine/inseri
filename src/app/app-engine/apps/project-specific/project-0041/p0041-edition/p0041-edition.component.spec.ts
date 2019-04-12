import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { P0041EditionComponent } from './p0041-edition.component';

describe('P0041EditionComponent', () => {
  let component: P0041EditionComponent;
  let fixture: ComponentFixture<P0041EditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ P0041EditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(P0041EditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
