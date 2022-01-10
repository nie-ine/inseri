import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';

import {MainComponent} from './main.component';

class RouterStub {
  navigateByUrl(url: string) {
    return url;
  }
}

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MainComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
