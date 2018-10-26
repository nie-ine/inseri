import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextLineNumberComponent } from './text-line-number.component';

describe('TextLineNumberComponent', () => {
  let component: TextLineNumberComponent;
  let fixture: ComponentFixture<TextLineNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextLineNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextLineNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have empty line label in line 3 with the pattern 4, 8, 12, 16, ...', () => {
    component.lineNumber = 3;
    component.repeatAfter = 4;
    component.startRepeatingAt = 0;
    component.forceLabelAt = [];

    component.updateLineLabel();
    expect(component.label).toBe('');
  });

  it('should have the line label 1 in line 1 with the pattern 4, 8, 12, 16, ... and a forced number at 1.', () => {
    component.lineNumber = 1;
    component.repeatAfter = 4;
    component.startRepeatingAt = 0;
    component.forceLabelAt = [1];

    component.updateLineLabel();
    expect(component.label).toBe('1');
  });

  it('should have the line label 6 in line 5 with the pattern 1, 6, 11, 16, ...', () => {
    component.lineNumber = 6;
    component.repeatAfter = 5;
    component.startRepeatingAt = 1;
    component.forceLabelAt = [];

    component.updateLineLabel();
    expect(component.label).toBe('6');
  });

});
