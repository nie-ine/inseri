import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {TiledImageObjectComponent} from './tiled-image-object.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {SynopsisImageData} from '../synopsis-object-data';

describe('TiledImageObjectComponent', () => {
  let component: TiledImageObjectComponent;
  let fixture: ComponentFixture<TiledImageObjectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TiledImageObjectComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiledImageObjectComponent);
    component = fixture.componentInstance;
    component.data = new SynopsisImageData('1', 'test', '../../test.jpg');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
