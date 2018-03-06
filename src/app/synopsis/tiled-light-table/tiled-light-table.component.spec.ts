import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TiledLightTableComponent} from './tiled-light-table.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {LightTableLayoutService} from '../light-table-layout.service';
import {LightTableStashService} from '../light-table-stash.service';

describe('TiledLightTableComponent', () => {
  let component: TiledLightTableComponent;
  let fixture: ComponentFixture<TiledLightTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TiledLightTableComponent],
      providers: [
        LightTableLayoutService,
        LightTableStashService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiledLightTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
