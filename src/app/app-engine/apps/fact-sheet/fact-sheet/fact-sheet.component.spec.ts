import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactSheetComponent } from './fact-sheet.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BaseTypeFormsModule } from '../../shared/base-type-forms/base-type-forms.module';

describe('FactSheetComponent', () => {
  let component: FactSheetComponent;
  let fixture: ComponentFixture<FactSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, BaseTypeFormsModule ],
      declarations: [ FactSheetComponent ]
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
