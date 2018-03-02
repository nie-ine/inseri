import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SynopsisSaveLightTableComponent } from './synopsis-save-light-table.component';
import { MatDialogRef } from '@angular/material';

describe('SynopsisSaveLightTableComponent', () => {
  let component: SynopsisSaveLightTableComponent;
  let fixture: ComponentFixture<SynopsisSaveLightTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SynopsisSaveLightTableComponent ],
      providers: [
        {provide: MatDialogRef, useValue: {}}
      ],
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
