import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextViewToolsComponent } from './text-view-tools.component';
import {KnoraRequestService} from '../../shared/knora-request.service';

describe('TextViewToolsComponent', () => {
  let component: TextViewToolsComponent;
  let fixture: ComponentFixture<TextViewToolsComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextViewToolsComponent ],

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextViewToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
