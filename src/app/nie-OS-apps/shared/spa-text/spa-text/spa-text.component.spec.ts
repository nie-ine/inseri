import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaTextComponent } from './spa-text.component';

describe('SpaTextComponent', () => {
  let component: SpaTextComponent;
  let fixture: ComponentFixture<SpaTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpaTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
