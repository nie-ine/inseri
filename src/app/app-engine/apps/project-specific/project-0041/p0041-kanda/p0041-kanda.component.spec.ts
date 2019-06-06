import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { P0041KandaComponent } from './p0041-kanda.component';

describe('P0041KandaComponent', () => {
  let component: P0041KandaComponent;
  let fixture: ComponentFixture<P0041KandaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ P0041KandaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(P0041KandaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
