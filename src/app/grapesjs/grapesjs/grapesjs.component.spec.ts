import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrapesjsComponent } from './grapesjs.component';
import { ExampleComponent } from 'nie-ine';

describe('GrapesjsComponent', () => {
  let component: GrapesjsComponent;
  let fixture: ComponentFixture<GrapesjsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrapesjsComponent, ExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrapesjsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
