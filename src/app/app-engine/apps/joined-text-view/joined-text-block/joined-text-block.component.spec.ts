import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TextLineGroupComponent } from './text-line-group.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('TextLineGroupComponent', () => {
  let component: TextLineGroupComponent;
  let fixture: ComponentFixture<TextLineGroupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TextLineGroupComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextLineGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // pretend that it was wired to something that supplied a text tree
    component.textTree = {
      lineGroupId: '1.1',
      lineGroupIri: 'cfugiuzoihjl',
      lines: [
        {
          lineId: '1.1.1',
          lineIri: 'bhjbljbjhl',
          textIri: 'Eiris%20 sazun%20 idisi%2C%20 sazun%20hera%20duoder',
          iriOfMargin: 'fussnoten%20 hier% 20als%20test jkbjjk jk'
        },
        {
          lineId: '1.1.2',
          lineIri: 'ydfgasfg',
          textIri: 'suma%20hapt%20 heptidun%2C%20suma%20 heri%20lezidun'
        },
        {
          lineId: '1.1.3',
          lineIri: 'hbugzuou',
          textIri: 'suma%20clubodun%20 umbi%20cuoniouuidi%3A'
        },
        {
          lineId: '1.1.4',
          lineIri: 'adsfgFASDGDF',
          textIri: 'insprinc%20haptbandun%2C%20 inuar%20uigandun.'
        }
      ]
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
