import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GndLobidComponent } from './gnd-lobid.component';

describe('GndLobidComponent', () => {
  let component: GndLobidComponent;
  let fixture: ComponentFixture<GndLobidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GndLobidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GndLobidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
