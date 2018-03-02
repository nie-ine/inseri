import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SynopsisLoadLightTableComponent } from './synopsis-load-light-table.component';
import { MatDialogRef } from '@angular/material';

describe('SynopsisLoadLightTableComponent', () => {
  let component: SynopsisLoadLightTableComponent;
  let fixture: ComponentFixture<SynopsisLoadLightTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SynopsisLoadLightTableComponent ],
      providers: [
        {provide: MatDialogRef, useValue: {}}
      ],
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
