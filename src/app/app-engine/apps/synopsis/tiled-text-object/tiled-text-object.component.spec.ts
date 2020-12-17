import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {TiledTextObjectComponent} from './tiled-text-object.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {SynopsisTextData} from '../synopsis-object-data';

describe('TiledTextObjectComponent', () => {
  let component: TiledTextObjectComponent;
  let fixture: ComponentFixture<TiledTextObjectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TiledTextObjectComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiledTextObjectComponent);
    component = fixture.componentInstance;
    component.data = new SynopsisTextData('1', 'test', 'a test text');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
