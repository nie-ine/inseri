import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndirectEntryComponent } from './indirect-entry.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('IndirectEntryComponent', () => {
  let component: IndirectEntryComponent;
  let fixture: ComponentFixture<IndirectEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ IndirectEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndirectEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
