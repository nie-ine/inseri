import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SynopsisSaveLightTableComponent } from './synopsis-save-light-table.component';

describe('SynopsisSaveLightTableComponent', () => {
  let component: SynopsisSaveLightTableComponent;
  let fixture: ComponentFixture<SynopsisSaveLightTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SynopsisSaveLightTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SynopsisSaveLightTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
