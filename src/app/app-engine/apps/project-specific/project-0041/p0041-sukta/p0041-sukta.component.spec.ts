import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { P0041SuktaComponent } from './p0041-sukta.component';

describe('P0041SuktaComponent', () => {
  let component: P0041SuktaComponent;
  let fixture: ComponentFixture<P0041SuktaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ P0041SuktaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(P0041SuktaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
