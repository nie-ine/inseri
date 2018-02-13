import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {By} from '@angular/platform-browser';

import {EditionViewComponent} from './edition-view.component';
import {KnoraRequestService} from '../shared/knora-request.service';
import {SparqlRequestService} from '../shared/sparql-request.service';
import {ResultToEditionMapperService} from './result-to-edition-mapper.service';


class knoraRequestServiceStub {}

class sparqlRequestServiceStub {}

class resultToEditionMapperServiceStub {}


describe('EditionViewComponent', () => {
  let component: EditionViewComponent;
  let fixture: ComponentFixture<EditionViewComponent>;
  let tools: HTMLElement;
  let structure: HTMLElement;
  let metadata: HTMLElement;
  let canvas: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditionViewComponent],
			schemas: [NO_ERRORS_SCHEMA],
			providers: [
				{provide: KnoraRequestService, useValue: knoraRequestServiceStub},
				{provide: SparqlRequestService, useValue: sparqlRequestServiceStub},
				{provide: ResultToEditionMapperService, useValue: resultToEditionMapperServiceStub}
			]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    tools = fixture.debugElement.query(By.css('app-edition-view-tools')).nativeElement;
    structure = fixture.debugElement.query(By.css('app-edition-view-structure')).nativeElement;
    metadata = fixture.debugElement.query(By.css('app-edition-view-metadata')).nativeElement;
    canvas = fixture.debugElement.query(By.css('app-edition-view-canvas')).nativeElement;
  });

  it('should contain child component app-edition-view-tools', () => {
    expect(tools).toBeDefined();
  });

  it('should contain child component app-edition-view-structure', () => {
    expect(structure).toBeDefined();
  });

  it('should contain child component app-edition-view-metadata', () => {
    expect(metadata).toBeDefined();
  });

  it('should contain child component app-edition-view-canvas', () => {
    expect(canvas).toBeDefined();
  });

});
