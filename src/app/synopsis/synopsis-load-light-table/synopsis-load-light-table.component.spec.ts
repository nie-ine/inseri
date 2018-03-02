import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SynopsisLoadLightTableComponent } from './synopsis-load-light-table.component';

describe('SynopsisLoadLightTableComponent', () => {
  let component: SynopsisLoadLightTableComponent;
  let fixture: ComponentFixture<SynopsisLoadLightTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SynopsisLoadLightTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SynopsisLoadLightTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
