import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { P0041StropheComponent } from './p0041-strophe.component';

describe('P0041StropheComponent', () => {
  let component: P0041StropheComponent;
  let fixture: ComponentFixture<P0041StropheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ P0041StropheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(P0041StropheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
