import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeafletExampleComponent } from './leaflet-example.component';

describe('LeafletExampleComponent', () => {
  let component: LeafletExampleComponent;
  let fixture: ComponentFixture<LeafletExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeafletExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeafletExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
