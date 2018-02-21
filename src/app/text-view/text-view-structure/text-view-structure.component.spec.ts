import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextViewStructureComponent } from './text-view-structure.component';

describe('TextViewStructureComponent', () => {
  let component: TextViewStructureComponent;
  let fixture: ComponentFixture<TextViewStructureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextViewStructureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextViewStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
