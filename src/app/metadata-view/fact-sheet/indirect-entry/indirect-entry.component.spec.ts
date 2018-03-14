import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndirectEntryComponent } from './indirect-entry.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('IndirectEntryComponent', () => {
  let component: IndirectEntryComponent;
  let fixture: ComponentFixture<IndirectEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientModule, HttpClientTestingModule ],
      declarations: [ IndirectEntryComponent ],
      providers: [ HttpClient ]
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
