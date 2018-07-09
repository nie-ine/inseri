import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactSheetComponent } from './fact-sheet.component';
import { IndirectEntryComponent } from '../indirect-entry/indirect-entry.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('FactSheetComponent', () => {
  let component: FactSheetComponent;
  let fixture: ComponentFixture<FactSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ FactSheetComponent, IndirectEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});