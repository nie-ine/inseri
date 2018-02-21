import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';

import {TextViewComponent} from './text-view.component';
import {By} from '@angular/platform-browser';
import {KnoraRequestService} from '../shared/knora-request.service';
import {SparqlRequestService} from '../shared/sparql-request.service';
import {ResultToTextMapperService} from './result-to-text-mapper.service';

describe('TextViewComponent', () => {
  let component: TextViewComponent;
  let fixture: ComponentFixture<TextViewComponent>;
  let tools: HTMLElement;
  let structure: HTMLElement;
  let metadata: HTMLElement;
  let canvas: HTMLElement;
  const knoraRequestServiceStub = {};
  const sparqlRequestServiceStub = {};
  const resultToTextMapperServiceStub = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TextViewComponent],
      providers: [
        {provide: KnoraRequestService, useValue: knoraRequestServiceStub},
        {provide: SparqlRequestService, useValue: sparqlRequestServiceStub},
        {provide: ResultToTextMapperService, useValue: resultToTextMapperServiceStub}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    tools = fixture.debugElement.query(By.css('app-text-view-tools')).nativeElement;
    structure = fixture.debugElement.query(By.css('app-text-view-structure')).nativeElement;
    metadata = fixture.debugElement.query(By.css('app-text-view-metadata')).nativeElement;
    canvas = fixture.debugElement.query(By.css('app-text-view-canvas')).nativeElement;
  });

  it('should contain child component app-text-view-tools', () => {
    expect(tools).toBeDefined();
  });

  it('should contain child component app-text-view-structure', () => {
    expect(structure).toBeDefined();
  });

  it('should contain child component app-text-view-metadata', () => {
    expect(metadata).toBeDefined();
  });

  it('should contain child component app-text-view-canvas', () => {
    expect(canvas).toBeDefined();
  });

});
