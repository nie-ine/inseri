import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LightTableComponent } from './light-table.component';

describe('LightTableComponent', () => {
  let component: LightTableComponent;
  let fixture: ComponentFixture<LightTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LightTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LightTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
